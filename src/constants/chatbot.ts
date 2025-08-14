import messages from "@/data/messages.json"

export const MOCK_PANEL_MESSAGES = messages.map(item => ({ ...item }))

export const MOCK_PANEL_USER_IMAGES = [...new Array(3)].map(
  (_, index) => `/assets/avatar-${index + 1}.jpg`
)
