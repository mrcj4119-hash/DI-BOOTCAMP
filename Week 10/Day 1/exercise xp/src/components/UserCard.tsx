interface UserCardProps {
  name?: string
  age?: number
  role?: string
}

function UserCard({
  name = 'Guest User',
  age = 0,
  role = 'Not specified',
}: UserCardProps) {
  return (
    <article className="user-card">
      <h3>{name}</h3>
      <p>{age > 0 ? `${age} years old` : 'Age not provided'}</p>
      <p className="user-role">{role}</p>
    </article>
  )
}

export default UserCard
