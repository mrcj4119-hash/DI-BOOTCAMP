interface GreetingProps {
  name: string
  messageCount: number
}

function Greeting({ name, messageCount }: GreetingProps) {
  return (
    <div className="greeting-card">
      <h3>Hello, {name}!</h3>
      <p>You have {messageCount} new messages.</p>
    </div>
  )
}

export default Greeting
