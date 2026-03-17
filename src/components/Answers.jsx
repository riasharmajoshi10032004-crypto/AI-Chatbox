import { useEffect, useState } from "react"
import { checkHeading, replaceHeadingStars } from "../Checkheading"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism"
import ReactMarkdown from "react-markdown"

const Answers = ({ ans, totalResult, index, type }) => {
  const [heading, setHeading] = useState(false)
  const [answer, setAnswer] = useState(ans)

  useEffect(() => {
    if (checkHeading(ans)) {
      setHeading(true)
      setAnswer(replaceHeadingStars(ans))
    }
  }, [ans])

  // 🔥 Markdown Code Renderer
  const renderer = {
    code({ inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "")

      return !inline && match ? (
        <SyntaxHighlighter
          {...props}
          language={match[1]}
          style={dark}
          PreTag="div"
          customStyle={{
            borderRadius: "12px",
            padding: "16px",
            fontSize: "14px",
          }}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code
          {...props}
          className="bg-zinc-700 text-white px-1 py-0.5 rounded"
        >
          {children}
        </code>
      )
    },
  }

  return (
    <>
      
      {index === 0 && totalResult > 1 ? (
        <span className="pt-2 text-xl block text-white">
          {answer}
        </span>
      ) : (
        <span
          className={
            heading
              ? "pt-2 text-lg block text-white"
              : type === "q"
              ? "pl-1"
              : "pl-5"
          }
        >
        
          <ReactMarkdown components={renderer}>
            {answer}
          </ReactMarkdown>
        </span>
      )}
    </>
  )
}

export default Answers