import React from "react"
import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer"
import { createTw } from "react-pdf-tailwind"

import {
  QuizOneResData,
  QuizQuestionListResData,
  QuizUserAttemptListData,
  QuizUserResultListResData,
} from "@/types/quiz/res"

Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
})

const tw = createTw({
  theme: {
    fontFamily: {
      sans: "Oswald",
    },
    extend: {
      colors: {
        custom: "cornflowerblue",
      },
    },
  },
})

interface MyDocumentProps {
  getQuizLesson: QuizQuestionListResData[]
  getOneQuiz: QuizOneResData
  getUserSelectedAnswer: QuizUserResultListResData[]
}

export default function MyDocument({
  getQuizLesson,
  getOneQuiz,
  getUserSelectedAnswer,
}: MyDocumentProps) {
  return (
    <Document pageMode={"fullScreen"}>
      <Page size="A4" style={tw("p-8 flex flex-col gap-4 font-sans w-full")}>
        <View style={tw("flex justify-center items-center")}>
          <Text style={tw("text-xl font-bold")}>
            Hasil Quiz : {getOneQuiz.quiz_title}
          </Text>
        </View>

        <View
          style={tw(
            "flex flex-col gap-2 justify-center items-start justify-start"
          )}
        >
          <View style={tw("flex flex-row gap-2 items-end justify-between")}>
            <Text style={tw("text-xs font-light")}>Nama</Text>

            <Text style={tw("text-xs font-light")}>: Placeholder</Text>
          </View>

          <View style={tw("flex flex-row gap-2 items-end justify-between")}>
            <Text style={tw("text-xs font-light")}>UUID</Text>

            <Text style={tw("text-xs font-light")}>
              : {getUserSelectedAnswer[0].user_uuid}
            </Text>
          </View>

          <View style={tw("flex flex-row gap-2 items-end justify-between")}>
            <Text style={tw("text-xs font-light")}>Skor</Text>

            <Text style={tw("text-xs font-light")}>
              : {getUserSelectedAnswer[0].score}
            </Text>
          </View>

          {/*<Text style={tw("text-xs font-light")}>*/}
          {/*  Nama : {getUserSelectedAnswer[0].user_uuid}*/}
          {/*</Text>*/}
        </View>

        <View
          style={tw(
            "h-px my-2 bg-gray-200 border-0 border-dotted dark:bg-gray-700"
          )}
        />

        {getQuizLesson.map((item, index) => {
          const userSelectedAnswer = getUserSelectedAnswer.find(
            (userAnswer) => userAnswer.id_question === item.id_question
          )

          return (
            <View style={tw("flex flex-row justify-between items-start gap-4")}>
              <View
                key={item.id_question}
                style={tw("flex flex-col gap-2 justify-center items-start")}
              >
                <View
                  style={tw("flex flex-row gap-2 items-end justify-between")}
                >
                  <Text style={tw("text-xs font-light")}>{index + 1}</Text>

                  <Text style={tw("text-xs font-light")}>
                    {item.question_text}
                  </Text>
                </View>

                {item.answers.map((answer, index) => {
                  const userSelectedAnswer = getUserSelectedAnswer.find(
                    (userAnswer) => userAnswer.id_question === item.id_question
                  )

                  return (
                    <View
                      key={answer.id_answer}
                      style={tw(
                        "flex flex-row gap-2 items-end justify-between"
                      )}
                    >
                      <Text style={tw("text-xs font-light")}>*</Text>

                      <Text style={tw("text-xs font-light")}>
                        {answer.answer_text}
                      </Text>

                      <Text style={tw("text-xs font-light")}>
                        {userSelectedAnswer?.answer_text === answer.answer_text
                          ? "Benar"
                          : "Salah"}
                      </Text>
                    </View>
                  )
                })}
              </View>

              <View style={tw("flex gap-2")}>
                <View style={tw("flex flex-row gap-2  justify-between")}>
                  <Text style={tw("text-xs font-light")}>Jawaban Anda</Text>

                  <Text style={tw("text-xs font-light")}>
                    : {userSelectedAnswer?.answer_text}
                  </Text>
                </View>

                <View style={tw("flex flex-row gap-2  justify-between")}>
                  <Text style={tw("text-xs font-light")}>Status</Text>

                  <Text style={tw("text-xs font-light")}>
                    : {userSelectedAnswer?.is_correct ? "Benar" : "Salah"}
                  </Text>
                </View>
              </View>
            </View>
          )
        })}
      </Page>
    </Document>
  )
}
