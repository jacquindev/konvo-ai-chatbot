"use server"

import prisma from "@/lib/prisma"
import { onAuthenticatedUser } from "./auth"

type UpdateField = {
  field: "icon" | "welcomeMessage" | "botBackground" | "bubbleColor" | "textColor" | "theme"
  value: string
}

export const onUpdateChatbotSettings = async (domainId: string, update: UpdateField) => {
  try {
    const authUser = await onAuthenticatedUser()
    if (!authUser.user || authUser.status !== 200) {
      return { status: 403, message: "Unauthorized" }
    }

    const updated = await prisma.domain.update({
      where: { id: domainId },
      data: {
        chatBot: {
          update: {
            data: {
              [update.field]: update.value,
            },
          },
        },
      },
    })

    if (updated) {
      return { status: 200, message: `Chatbot's ${update.field} updated successfully` }
    }

    return { status: 400, message: "Oops! Something went wrong" }
  } catch (error) {
    console.error(error)
    return { status: 500, message: "Internal Server Error" }
  }
}

export const onGetAllHelpDeskQuestions = async (domainId: string) => {
  try {
    const questions = await prisma.helpDesk.findMany({
      where: { domainId },
    })

    if (questions) {
      return { status: 200, questions }
    }

    return { status: 404, message: "No HelpDesk questions found" }
  } catch (error) {
    console.error(error)
    return { status: 500, message: "Internal Server Error" }
  }
}

export const onGetAllFilterQuestions = async (domainId: string) => {
  try {
    const questions = await prisma.filterQuestion.findMany({
      where: { domainId },
    })

    if (questions) {
      return { status: 200, questions }
    }

    return { status: 404, message: "No HelpDesk questions found" }
  } catch (error) {
    console.error(error)
    return { status: 500, message: "Internal Server Error" }
  }
}

export const onCreateHelpDeskQuestion = async (
  domainId: string,
  question: string,
  answer: string
) => {
  try {
    const helpdesk = await prisma.domain.update({
      where: {
        id: domainId,
      },
      data: {
        helpDesk: {
          create: { question, answer },
        },
      },
      include: {
        helpDesk: {
          select: {
            id: true,
            question: true,
            answer: true,
          },
        },
      },
    })

    if (helpdesk) {
      return {
        status: 200,
        message: "New help desk question created successfully",
        data: helpdesk.helpDesk,
      }
    }

    return {
      status: 400,
      message: "Failed to create help desk question",
    }
  } catch (error) {
    console.error("CREATE HELP DESK ERROR:", error)
    return { status: 500, message: "Internal Server Error" }
  }
}

export const onCreateFilterQuestion = async (domainId: string, question: string) => {
  try {
    const auth = await onAuthenticatedUser()
    if (!auth.user || auth.status !== 200) {
      return { status: 403 }
    }

    const existingQuestion = await prisma.filterQuestion.findFirst({
      where: { question },
    })

    if (existingQuestion) {
      return {
        status: 200,
        data: existingQuestion,
        message: "Question already exists",
      }
    }

    const newQuestion = await prisma.filterQuestion.create({
      data: {
        domainId,
        question,
      },
    })

    if (newQuestion) {
      return {
        status: 201,
        data: newQuestion,
        message: "New filter question created successfully",
      }
    }

    return { status: 400, message: "Oops! Something went wrong" }
  } catch (error) {
    console.error(error)
    return { status: 500, message: "Internal Server Error" }
  }
}
