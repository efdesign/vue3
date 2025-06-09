<template>
    <div class="pip-demo-container">
        <h1>Document Picture-in-Picture API Demo</h1>

        <div class="demo-info">
            <p>
                This demo showcases the <strong>Document Picture-in-Picture API</strong>,
                which allows web applications to create always-on-top floating windows
                with custom HTML content.
            </p>
            <p>
                <strong>Browser Support:</strong> Currently supported in Chrome 116+ and Edge 116+.
                Requires HTTPS or localhost for security.
            </p>
        </div>

        <!-- Basic PiP Demo -->
        <div class="demo-section">
            <h2>Basic Picture-in-Picture</h2>
            <PictureInPicture title="Basic PiP Demo" :width="400" :height="300" @opened="onPipOpened"
                @closed="onPipClosed" @error="onPipError" />
        </div>

        <!-- Custom Content PiP Demo -->
        <div class="demo-section">
            <h2>Custom Content Picture-in-Picture</h2>
            <PictureInPicture title="Video Player Simulator" :width="600" :height="400"
                :disallow-return-to-opener="false" :prefer-initial-window-placement="true" @opened="onCustomPipOpened"
                @closed="onCustomPipClosed" @error="onPipError">
                <div class="video-player-demo">
                    <div class="video-placeholder">
                        <Icon name="fi-rr-plus" class="play-icon" />
                        <p>Fake Video Player</p>
                    </div>
                    <div class="video-controls">
                        <button @click="togglePlay" class="control-btn">
                            <Icon :name="isPlaying ? 'fi-rr-minus' : 'fi-rr-plus'" />
                            {{ isPlaying ? 'Pause' : 'Play' }}
                        </button>
                        <div class="volume-control">
                            <Icon name="fi-rr-bell" />
                            <input type="range" v-model="volume" min="0" max="100" class="volume-slider" />
                            <span>{{ volume }}%</span>
                        </div>
                    </div>
                    <div class="video-info">
                        <p><strong>Title:</strong> Sample Video Content</p>
                        <p><strong>Duration:</strong> {{ formatTime(currentTime) }} / {{ formatTime(totalTime) }}</p>
                        <p><strong>Status:</strong> {{ isPlaying ? 'Playing' : 'Paused' }}</p>
                    </div>
                </div>
            </PictureInPicture>
        </div>

        <!-- Productivity Tool Demo -->
        <div class="demo-section">
            <h2>Productivity Tool Demo</h2>
            <PictureInPicture title="Timer & Notes" :width="350" :height="450" :disallow-return-to-opener="true"
                @opened="onProductivityPipOpened" @closed="onProductivityPipClosed" @error="onPipError">
                <div class="productivity-demo">
                    <div class="timer-section">
                        <h3>Pomodoro Timer</h3>
                        <div class="timer-display">
                            {{ formatTimer(timerSeconds) }}
                        </div>
                        <div class="timer-controls">
                            <button @click="startTimer" :disabled="timerRunning" class="timer-btn start">
                                <Icon name="fi-rr-plus" />
                                Start
                            </button>
                            <button @click="pauseTimer" :disabled="!timerRunning" class="timer-btn pause">
                                <Icon name="fi-rr-minus" />
                                Pause
                            </button>
                            <button @click="resetTimer" class="timer-btn reset">
                                <Icon name="fi-rr-refresh" />
                                Reset
                            </button>
                        </div>
                    </div>

                    <div class="notes-section">
                        <h3>Quick Notes</h3>
                        <textarea v-model="notes" placeholder="Write your notes here..." class="notes-textarea"
                            rows="6"></textarea>
                        <p class="character-count">{{ notes.length }} characters</p>
                    </div>
                </div>
            </PictureInPicture>
        </div>

        <!-- Event Log -->
        <div class="demo-section">
            <h2>Event Log</h2>
            <div class="event-log">
                <div v-for="(event, index) in eventLog" :key="index" class="event-item" :class="event.type">
                    <span class="event-time">{{ event.timestamp }}</span>
                    <span class="event-message">{{ event.message }}</span>
                </div>
                <div v-if="eventLog.length === 0" class="no-events">
                    No events yet. Try opening a Picture-in-Picture window!
                </div>
            </div>
        </div>

        <!-- API Information -->
        <div class="demo-section">
            <h2>API Information</h2>
            <div class="api-info">
                <div class="info-grid">
                    <div class="info-item">
                        <strong>API Available:</strong>
                        <span :class="apiAvailable ? 'status-yes' : 'status-no'">
                            {{ apiAvailable ? 'Yes' : 'No' }}
                        </span>
                    </div>
                    <div class="info-item">
                        <strong>User Agent:</strong>
                        <span class="user-agent">{{ userAgent }}</span>
                    </div>
                    <div class="info-item">
                        <strong>Secure Context:</strong>
                        <span :class="isSecureContext ? 'status-yes' : 'status-no'">
                            {{ isSecureContext ? 'Yes' : 'No' }}
                        </span>
                    </div>
                    <div class="info-item">
                        <strong>Active PiP Windows:</strong>
                        <span>{{ activePipWindows }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import PictureInPicture from '../plugins/components/PictureInPicture.vue'
import Icon from '../plugins/components/Icon.vue'

// Demo state
const isPlaying = ref(false)
const volume = ref(75)
const currentTime = ref(0)
const totalTime = ref(180) // 3 minutes

// Timer state
const timerSeconds = ref(25 * 60) // 25 minutes default
const timerRunning = ref(false)
const timerInterval = ref<number>()

// Notes state
const notes = ref('')

// Event logging
interface LogEvent {
    timestamp: string
    message: string
    type: 'info' | 'success' | 'error'
}

const eventLog = ref<LogEvent[]>([])
const activePipWindows = ref(0)

// API detection
const apiAvailable = ref(false)
const isSecureContext = ref(false)
const userAgent = ref('')

// Methods
const addEvent = (message: string, type: LogEvent['type'] = 'info') => {
    eventLog.value.unshift({
        timestamp: new Date().toLocaleTimeString(),
        message,
        type
    })
    // Keep only last 10 events
    if (eventLog.value.length > 10) {
        eventLog.value.pop()
    }
}

const togglePlay = () => {
    isPlaying.value = !isPlaying.value
    addEvent(`Video ${isPlaying.value ? 'started' : 'paused'}`, 'info')
}

const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
}

const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

const startTimer = () => {
    if (timerRunning.value) return

    timerRunning.value = true
    addEvent('Pomodoro timer started', 'success')

    timerInterval.value = setInterval(() => {
        if (timerSeconds.value > 0) {
            timerSeconds.value--
        } else {
            pauseTimer()
            addEvent('Pomodoro timer completed!', 'success')
        }
    }, 1000)
}

const pauseTimer = () => {
    timerRunning.value = false
    if (timerInterval.value) {
        clearInterval(timerInterval.value)
    }
    addEvent('Pomodoro timer paused', 'info')
}

const resetTimer = () => {
    pauseTimer()
    timerSeconds.value = 25 * 60
    addEvent('Pomodoro timer reset', 'info')
}

// PiP Event Handlers
const onPipOpened = (window: Window) => {
    activePipWindows.value++
    addEvent('Basic PiP window opened', 'success')
}

const onPipClosed = () => {
    activePipWindows.value--
    addEvent('Basic PiP window closed', 'info')
}

const onCustomPipOpened = (window: Window) => {
    activePipWindows.value++
    addEvent('Video player PiP window opened', 'success')
}

const onCustomPipClosed = () => {
    activePipWindows.value--
    addEvent('Video player PiP window closed', 'info')
}

const onProductivityPipOpened = (window: Window) => {
    activePipWindows.value++
    addEvent('Productivity PiP window opened', 'success')
}

const onProductivityPipClosed = () => {
    activePipWindows.value--
    addEvent('Productivity PiP window closed', 'info')
}

const onPipError = (error: Error) => {
    addEvent(`PiP Error: ${error.message}`, 'error')
}

// Lifecycle
onMounted(() => {  // Check API support
    apiAvailable.value = 'documentPictureInPicture' in window
    isSecureContext.value = window.isSecureContext
    userAgent.value = navigator.userAgent.split(' ').slice(-2).join(' ')

    addEvent('Picture-in-Picture demo loaded', 'info')

    if (!apiAvailable.value) {
        addEvent('Document Picture-in-Picture API not supported in this browser', 'error')
    } else if (!isSecureContext.value) {
        addEvent('Document Picture-in-Picture requires HTTPS or localhost', 'error')
    }
})

onUnmounted(() => {
    if (timerInterval.value) {
        clearInterval(timerInterval.value)
    }
})
</script>

<style scoped>
.pip-demo-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    font-family: system-ui, -apple-system, sans-serif;
}

.pip-demo-container h1 {
    text-align: center;
    color: #333;
    margin-bottom: 30px;
    font-size: 2.5rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.demo-info {
    background: #f8f9fa;
    padding: 20px;
    border-radius: 12px;
    margin-bottom: 30px;
    border-left: 4px solid #667eea;
}

.demo-info p {
    margin: 10px 0;
    line-height: 1.6;
    color: #555;
}

.demo-section {
    margin-bottom: 40px;
}

.demo-section h2 {
    color: #333;
    border-bottom: 2px solid #667eea;
    padding-bottom: 8px;
    margin-bottom: 20px;
}

/* Video Player Demo Styles */
.video-player-demo {
    text-align: center;
}

.video-placeholder {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 60px 20px;
    border-radius: 12px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

.play-icon {
    font-size: 48px;
}

.video-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin-bottom: 20px;
    flex-wrap: wrap;
}

.control-btn {
    padding: 8px 16px;
    border: none;
    border-radius: 6px;
    background: #667eea;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    font-weight: 500;
    transition: background 0.2s;
}

.control-btn:hover {
    background: #5a6fd8;
}

.volume-control {
    display: flex;
    align-items: center;
    gap: 8px;
}

.volume-slider {
    width: 100px;
}

.video-info {
    background: #f8f9fa;
    padding: 16px;
    border-radius: 8px;
    text-align: left;
}

.video-info p {
    margin: 8px 0;
    font-size: 14px;
}

/* Productivity Demo Styles */
.productivity-demo {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.timer-section,
.notes-section {
    text-align: center;
}

.timer-section h3,
.notes-section h3 {
    margin: 0 0 16px 0;
    color: #333;
}

.timer-display {
    font-size: 3rem;
    font-weight: bold;
    color: #667eea;
    margin-bottom: 20px;
    font-family: 'Courier New', monospace;
}

.timer-controls {
    display: flex;
    gap: 8px;
    justify-content: center;
    flex-wrap: wrap;
}

.timer-btn {
    padding: 8px 12px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 4px;
    font-weight: 500;
    transition: all 0.2s;
    min-width: 80px;
}

.timer-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.timer-btn.start {
    background: #28a745;
    color: white;
}

.timer-btn.start:hover:not(:disabled) {
    background: #218838;
}

.timer-btn.pause {
    background: #ffc107;
    color: #333;
}

.timer-btn.pause:hover:not(:disabled) {
    background: #e0a800;
}

.timer-btn.reset {
    background: #dc3545;
    color: white;
}

.timer-btn.reset:hover {
    background: #c82333;
}

.notes-textarea {
    width: 100%;
    padding: 12px;
    border: 2px solid #e1e5e9;
    border-radius: 8px;
    font-family: inherit;
    font-size: 14px;
    resize: vertical;
    transition: border-color 0.2s;
}

.notes-textarea:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.character-count {
    text-align: right;
    font-size: 12px;
    color: #666;
    margin-top: 8px;
}

/* Event Log Styles */
.event-log {
    background: #f8f9fa;
    border-radius: 8px;
    padding: 16px;
    max-height: 300px;
    overflow-y: auto;
}

.event-item {
    display: flex;
    gap: 12px;
    padding: 8px 0;
    border-bottom: 1px solid #e9ecef;
}

.event-item:last-child {
    border-bottom: none;
}

.event-time {
    font-family: 'Courier New', monospace;
    font-size: 12px;
    color: #666;
    min-width: 80px;
}

.event-message {
    flex: 1;
    font-size: 14px;
}

.event-item.success .event-message {
    color: #28a745;
}

.event-item.error .event-message {
    color: #dc3545;
}

.event-item.info .event-message {
    color: #333;
}

.no-events {
    text-align: center;
    color: #666;
    font-style: italic;
    padding: 20px;
}

/* API Info Styles */
.api-info {
    background: #f8f9fa;
    border-radius: 8px;
    padding: 20px;
}

.info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 16px;
}

.info-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
}

.status-yes {
    color: #28a745;
    font-weight: bold;
}

.status-no {
    color: #dc3545;
    font-weight: bold;
}

.user-agent {
    font-family: 'Courier New', monospace;
    font-size: 12px;
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

/* Responsive Design */
@media (max-width: 768px) {
    .pip-demo-container {
        padding: 16px;
    }

    .pip-demo-container h1 {
        font-size: 2rem;
    }

    .video-controls {
        flex-direction: column;
        align-items: stretch;
    }

    .timer-controls {
        flex-direction: column;
    }

    .info-grid {
        grid-template-columns: 1fr;
    }
}
</style>
