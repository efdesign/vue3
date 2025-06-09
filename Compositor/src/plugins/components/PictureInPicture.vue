<template>
    <div class="pip-container" :class="{ 'pip-active': isInPictureInPicture }">
        <div class="pip-header">
            <h3>{{ title }}</h3>
            <div class="pip-controls">
                <button v-if="!isInPictureInPicture && apiSupported" @click="openPictureInPicture" class="pip-button"
                    title="Open in Picture-in-Picture">
                    <Icon name="fi-rr-window" />
                    PiP
                </button>
                <button v-if="isInPictureInPicture" @click="closePictureInPicture" class="pip-button close"
                    title="Close Picture-in-Picture">
                    <Icon name="fi-rr-cross" />
                    Close
                </button>
                <span v-if="!apiSupported" class="pip-unsupported">
                    PiP not supported
                </span>
            </div>
        </div>

        <div class="pip-content" ref="contentRef">
            <slot>
                <div class="default-content">
                    <p>This is a Picture-in-Picture demo component!</p>
                    <p>Click the PiP button to float this content in a separate window.</p>
                    <div class="demo-stats">
                        <p><strong>Current Time:</strong> {{ currentTime }}</p>
                        <p><strong>PiP Status:</strong> {{ isInPictureInPicture ? 'Active' : 'Inactive' }}</p>
                        <p><strong>API Support:</strong> {{ apiSupported ? 'Yes' : 'No' }}</p>
                    </div>
                    <div class="demo-controls">
                        <button @click="incrementCounter" class="demo-button">
                            Count: {{ counter }}
                        </button>
                        <input v-model="userInput" placeholder="Type something..." class="demo-input" />
                    </div>
                </div>
            </slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import Icon from './Icon.vue'

// Props
interface Props {
    title?: string
    width?: number
    height?: number
    disallowReturnToOpener?: boolean
    preferInitialWindowPlacement?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    title: 'Picture-in-Picture Window',
    width: 400,
    height: 300,
    disallowReturnToOpener: false,
    preferInitialWindowPlacement: false
})

// Emits
const emit = defineEmits<{
    opened: [window: Window]
    closed: []
    error: [error: Error]
}>()

// Reactive state
const isInPictureInPicture = ref(false)
const apiSupported = ref(false)
const currentTime = ref('')
const counter = ref(0)
const userInput = ref('')
const contentRef = ref<HTMLElement>()

// Picture-in-Picture window reference
let pipWindow: Window | null = null
let originalContent: HTMLElement | null = null
let timeInterval: number | null = null

// Check API support
const checkApiSupport = () => {
    apiSupported.value = 'documentPictureInPicture' in window &&
        'requestWindow' in (window as any).documentPictureInPicture
}

// Update current time
const updateTime = () => {
    currentTime.value = new Date().toLocaleTimeString()
}

// Increment counter (to show state sync)
const incrementCounter = () => {
    counter.value++
}

// Copy styles to PiP window
const copyStylesToPipWindow = (pipWindow: Window) => {
    // Copy all stylesheets from main document
    const styleSheets = Array.from(document.styleSheets)

    styleSheets.forEach(styleSheet => {
        try {
            // Try to access cssRules (might fail for external stylesheets)
            const cssRules = Array.from(styleSheet.cssRules || [])

            if (cssRules.length > 0) {
                const style = pipWindow.document.createElement('style')
                cssRules.forEach(rule => {
                    style.appendChild(pipWindow.document.createTextNode(rule.cssText))
                })
                pipWindow.document.head.appendChild(style)
            } else if (styleSheet.href) {
                // External stylesheet - create link element
                const link = pipWindow.document.createElement('link')
                link.rel = 'stylesheet'
                link.href = styleSheet.href
                pipWindow.document.head.appendChild(link)
            }
        } catch (e) {
            // Handle CORS or other access issues
            console.warn('Could not copy stylesheet:', e)
        }
    })

    // Add PiP-specific styles
    const pipStyles = pipWindow.document.createElement('style')
    pipStyles.textContent = `
    body {
      margin: 0;
      padding: 16px;
      font-family: system-ui, -apple-system, sans-serif;
      background: white;
      overflow: auto;
    }
    
    .pip-container {
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    
    .pip-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 12px;
      background: #f5f5f5;
      border-bottom: 1px solid #ddd;
      border-radius: 6px 6px 0 0;
    }
    
    .pip-header h3 {
      margin: 0;
      font-size: 14px;
      color: #333;
    }
    
    .pip-content {
      flex: 1;
      padding: 16px;
      overflow: auto;
    }
    
    .pip-button {
      padding: 4px 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
      background: white;
      cursor: pointer;
      font-size: 12px;
      display: flex;
      align-items: center;
      gap: 4px;
    }
    
    .pip-button:hover {
      background: #f0f0f0;
    }
    
    .pip-button.close {
      background: #ff4444;
      color: white;
      border-color: #cc3333;
    }
    
    .pip-button.close:hover {
      background: #cc3333;
    }
    
    .demo-stats p {
      margin: 8px 0;
      font-size: 14px;
    }
    
    .demo-controls {
      margin-top: 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    
    .demo-button {
      padding: 8px 12px;
      border: 1px solid #007acc;
      border-radius: 4px;
      background: #007acc;
      color: white;
      cursor: pointer;
    }
    
    .demo-button:hover {
      background: #005a99;
    }
    
    .demo-input {
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 14px;
    }
    
    .default-content {
      max-width: 100%;
    }
  `
    pipWindow.document.head.appendChild(pipStyles)
}

// Open Picture-in-Picture window
const openPictureInPicture = async () => {
    if (!apiSupported.value || isInPictureInPicture.value) return

    try {
        // Request PiP window
        pipWindow = await (window as any).documentPictureInPicture.requestWindow({
            width: props.width,
            height: props.height,
            disallowReturnToOpener: props.disallowReturnToOpener,
            preferInitialWindowPlacement: props.preferInitialWindowPlacement
        })    // Copy styles to PiP window
        if (pipWindow) {
            copyStylesToPipWindow(pipWindow)

            // Move content to PiP window
            if (contentRef.value) {
                originalContent = contentRef.value.cloneNode(true) as HTMLElement
                pipWindow.document.body.appendChild(contentRef.value)
            }

            // Update state
            isInPictureInPicture.value = true

            // Handle PiP window close
            pipWindow.addEventListener('pagehide', () => {
                closePictureInPicture()
            })      // Emit event
            emit('opened', pipWindow)
        }
    } catch (error) {
        console.error('Failed to open Picture-in-Picture:', error)
        emit('error', error as Error)
    }
}

// Close Picture-in-Picture window
const closePictureInPicture = () => {
    if (!isInPictureInPicture.value || !pipWindow) return

    try {
        // Move content back to main window
        if (originalContent && pipWindow.document.body.firstChild) {
            const pipContent = pipWindow.document.body.firstChild as HTMLElement

            // Find the container in the main document to restore content
            nextTick(() => {
                if (contentRef.value && contentRef.value.parentNode) {
                    contentRef.value.parentNode.replaceChild(pipContent, contentRef.value)
                    contentRef.value = pipContent as HTMLElement
                }
            })
        }

        // Close PiP window
        pipWindow.close()
        pipWindow = null
        originalContent = null

        // Update state
        isInPictureInPicture.value = false    // Emit event
        emit('closed')
    } catch (error) {
        console.error('Failed to close Picture-in-Picture:', error)
        emit('error', error as Error)
    }
}

// Lifecycle
onMounted(() => {
    checkApiSupport()
    updateTime()
    timeInterval = setInterval(updateTime, 1000)
})

onUnmounted(() => {
    if (timeInterval) {
        clearInterval(timeInterval)
    }
    if (isInPictureInPicture.value) {
        closePictureInPicture()
    }
})

// Expose methods for parent components
defineExpose({
    openPictureInPicture,
    closePictureInPicture,
    isInPictureInPicture,
    apiSupported
})
</script>

<style scoped>
.pip-container {
    border: 1px solid #ddd;
    border-radius: 8px;
    background: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    max-width: 500px;
    margin: 16px auto;
    overflow: hidden;
}

.pip-container.pip-active {
    opacity: 0.5;
    pointer-events: none;
    border-color: #007acc;
    background: #f0f8ff;
}

.pip-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
}

.pip-header h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
}

.pip-controls {
    display: flex;
    align-items: center;
    gap: 8px;
}

.pip-button {
    padding: 6px 12px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    cursor: pointer;
    font-size: 12px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 4px;
    transition: all 0.2s;
}

.pip-button:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
}

.pip-button.close {
    background: #ff4444;
    border-color: #cc3333;
}

.pip-button.close:hover {
    background: #cc3333;
}

.pip-unsupported {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.7);
    font-style: italic;
}

.pip-content {
    padding: 20px;
    min-height: 200px;
}

.default-content {
    text-align: center;
}

.default-content p {
    margin: 0 0 16px 0;
    color: #555;
    line-height: 1.5;
}

.demo-stats {
    background: #f8f9fa;
    padding: 16px;
    border-radius: 8px;
    margin: 20px 0;
    text-align: left;
}

.demo-stats p {
    margin: 8px 0;
    font-family: 'Courier New', monospace;
    font-size: 14px;
}

.demo-controls {
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-width: 300px;
    margin: 0 auto;
}

.demo-button {
    padding: 12px 20px;
    border: none;
    border-radius: 6px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.2s;
}

.demo-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.demo-input {
    padding: 12px;
    border: 2px solid #e1e5e9;
    border-radius: 6px;
    font-size: 14px;
    transition: border-color 0.2s;
}

.demo-input:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

/* PiP specific styles when in main window */
@media (display-mode: picture-in-picture) {
    .pip-container {
        border: none;
        border-radius: 0;
        box-shadow: none;
        margin: 0;
        height: 100vh;
    }

    .pip-header {
        border-radius: 0;
    }
}
</style>
