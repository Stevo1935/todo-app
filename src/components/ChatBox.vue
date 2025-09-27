<script setup lang="ts">
import { ref, computed } from "vue";

interface Message {
  sender: "user" | "bot";
  text: string;
}

const messages = ref<Message[]>([]);
const input = ref("");

const isOpen = ref(false);

const isExpanded = computed(() => isOpen.value && messages.value.length > 0);

function toggleChat() {
  isOpen.value = !isOpen.value;
}

function sendMessage() {
  if (!input.value.trim()) return;

  messages.value.push({ sender: "user", text: input.value });

  const userInput = input.value;
  input.value = "";

  // Fake AI response
  setTimeout(() => {
    messages.value.push({
      sender: "bot",
      text: `🤖 AI says: "${userInput}" received.`,
    });
  }, 800);
}
</script>

<template>
  <div>
    <button class="chat-toggle" @click="toggleChat">💬</button>

    <!-- Chatbox -->
    <div v-if="isOpen" class="chatbox" :class="{ expanded: isExpanded }">
      <div v-if="isExpanded" class="messages">
        <div
          v-for="(msg, index) in messages"
          :key="index"
          :class="['message', msg.sender]"
        >
          <span>{{ msg.text }}</span>
        </div>
      </div>

      <form class="input-area" @submit.prevent="sendMessage">
        <input
          v-model="input"
          type="text"
          placeholder="Chat with AI..."
          aria-label="Chat input"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.chat-toggle {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  border: none;
  background: hsl(250, 70%, 10%);
  color: white;
  font-size: 22px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 10000;
}

.chatbox {
  position: fixed;
  bottom: 80px;
  right: 20px;
  width: 280px;
  border: 1px solid #ccc;
  border-radius: 12px;
  font-family: sans-serif;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  background: white;
  transition: all 0.3s ease-in-out;
  z-index: 9999;
}

.chatbox {
  height: auto;
}

.chatbox.expanded {
  height: 350px;
  display: flex;
  flex-direction: column;
}

.messages {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  background: #f9f9f9;
}

.message {
  margin: 6px 0;
  padding: 8px 12px;
  border-radius: 12px;
  max-width: 75%;
  word-wrap: break-word;
}

.message.user {
  background: hsl(250, 70%, 10%);
  color: white;
  align-self: flex-end;
}

.message.bot {
  background: #e5e5ea;
  color: black;
  align-self: flex-start;
}

.input-area {
  display: flex;
  border-top: 1px solid #ccc;
}

.input-area input {
  flex: 1;
  padding: 10px;
  border: none;
  outline: none;
  font-size: 14px;
}

.input-area button {
  background: hsl(250, 70%, 10%);
  color: white;
  border: none;
  padding: 0 15px;
  cursor: pointer;
}
</style>
