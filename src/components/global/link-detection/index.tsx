import Linkify from "linkify-react"
import Link from "next/link"
import React from "react"

type Props = { content: string }

const LinkDetection = ({ content }: Props) => {
  const options = {
    target: "_blank",
    rel: "noopener noreferrer",
    className: "text-blue-300 dark:text-indigo-600 hover:underline font-bold",
    format: (value: string) => {
      try {
        const url = new URL(value)
        return url.hostname.replace(/^www\./, "") // Remove www
      } catch {
        return value
      }
    },
    render: ({
      attributes,
      content,
    }: {
      attributes: React.AnchorHTMLAttributes<HTMLAnchorElement>
      content: string
    }) => {
      return (
        <Link
          href={attributes.href ?? "#"}
          className="text-pink-300 dark:text-indigo-600 hover:underline font-bold"
        >
          {content}
        </Link>
      )
    },
  }

  return <Linkify options={options}>{content}</Linkify>
}

export default LinkDetection
