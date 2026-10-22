import { useEffect, useState, type FormEvent } from 'react'
import {
  BookOpen,
  Check,
  CircleHelp,
  Feather,
  FilePenLine,
  Filter,
  LoaderCircle,
  LogOut,
  MessageCircle,
  Moon,
  Plus,
  Search,
  Send,
  Sun,
  Users,
  X,
} from 'lucide-react'
import type { Story } from '../../types/types'
import { useAppDispatch, useAppSelector } from './app/hooks'
import {
  restoreSession,
  signIn,
  signOut,
  signUp,
} from './features/auth/authSlice'
import {
  addComment,
  clearStories,
  createStory,
  deleteComment,
  deleteStory,
  editComment,
  inviteContributor,
  loadComments,
  loadStories,
  removeContributor,
  reactToComment,
  setCommentsEnabled,
  updateStory,
} from './features/stories/storiesSlice'
import './App.css'

type Dialog = 'login' | 'signup' | 'editor' | 'story' | null
type StoryFilter = 'all' | 'mine' | 'collaborating'

const coverImages = [
  'photo-1470252649378-9c29740c9fa8',
  'photo-1470770841072-f978cf4d019e',
  'photo-1500530855697-b586d89ba3ee',
  'photo-1476231682828-37e571bc172f',
]

function coverFor(storyId: number) {
  const image = coverImages[storyId % coverImages.length]
  return `https://images.unsplash.com/${image}?auto=format&fit=crop&w=900&q=82`
}

function App() {
  const dispatch = useAppDispatch()
  const { user, accessToken, status: authStatus } = useAppSelector((state) => state.auth)
  const { items, comments, status: storiesStatus, saving, error } = useAppSelector((state) => state.stories)
  const [theme, setTheme] = useState<'dark' | 'light'>('light')
  const [dialog, setDialog] = useState<Dialog>(null)
  const [storyFilter, setStoryFilter] = useState<StoryFilter>('all')
  const [search, setSearch] = useState('')
  const [activeStoryId, setActiveStoryId] = useState<number | null>(null)
  const [editingStory, setEditingStory] = useState<Story | null>(null)
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')
  const [formError, setFormError] = useState('')
  const [commentText, setCommentText] = useState('')
  const [inviteEmail, setInviteEmail] = useState('')
  const [notice, setNotice] = useState('')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  useEffect(() => {
    void dispatch(restoreSession())
  }, [dispatch])

  useEffect(() => {
    if (authStatus === 'authenticated') void dispatch(loadStories())
    if (authStatus === 'guest') dispatch(clearStories())
  }, [authStatus, dispatch])

  useEffect(() => {
    if (!accessToken) return undefined
    const socket = new WebSocket(`ws://127.0.0.1:3002/ws?token=${encodeURIComponent(accessToken)}`)
    socket.addEventListener('open', () => { if (activeStoryId) socket.send(JSON.stringify({ type: 'subscribe', storyId: activeStoryId })) })
    socket.addEventListener('message', (event) => { try { if (JSON.parse(event.data).type === 'story.updated') void dispatch(loadStories()) } catch { /* Ignore malformed socket events. */ } })
    return () => socket.close()
  }, [accessToken, activeStoryId, dispatch])

  const activeStory = items.find((story) => story.id === activeStoryId) ?? null
  const visibleStories = items.filter((story) => {
    const matchesFilter = storyFilter === 'all'
      || (storyFilter === 'mine' && story.author_id === user?.id)
      || (storyFilter === 'collaborating' && story.author_id !== user?.id)
    const matchesSearch = `${story.title} ${story.content} ${story.author}`.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })
  const myStories = items.filter((story) => story.author_id === user?.id).length
  const collaborativeStories = items.filter((story) => story.author_id !== user?.id).length

  function openAuth(mode: 'login' | 'signup') {
    setAuthMode(mode)
    setFormError('')
    setDialog(mode)
  }

  function openEditor(story: Story | null = null) {
    setEditingStory(story)
    setFormError('')
    setDialog('editor')
  }

  async function submitAuth(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError('')
    const form = new FormData(event.currentTarget)
    const email = String(form.get('email') ?? '').trim().toLowerCase()
    const password = String(form.get('password') ?? '')
    try {
      if (authMode === 'signup') {
        const username = email
        await dispatch(signUp({ username, email, password })).unwrap()
      } else {
        await dispatch(signIn({ email, password })).unwrap()
      }
      setDialog(null)
    } catch (reason) {
      setFormError(typeof reason === 'string' ? reason : 'Please check your details and try again.')
    }
  }

  async function submitStory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError('')
    const form = new FormData(event.currentTarget)
    const input = {
      title: String(form.get('title') ?? '').trim(),
      content: String(form.get('content') ?? '').trim(),
    }
    try {
      if (editingStory) {
        const updated = await dispatch(updateStory({ id: editingStory.id, ...input })).unwrap()
        setActiveStoryId(updated.id)
        setDialog('story')
      } else {
        const created = await dispatch(createStory(input)).unwrap()
        setActiveStoryId(created.id)
        setDialog('story')
      }
    } catch (reason) {
      setFormError(typeof reason === 'string' ? reason : 'Your story could not be saved.')
    }
  }

  async function submitComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!activeStory || !commentText.trim()) return
    try {
      await dispatch(addComment({ storyId: activeStory.id, content: commentText.trim() })).unwrap()
      setCommentText('')
    } catch {
      setNotice('Your comment could not be posted.')
    }
  }

  async function handleEditComment(commentId: number, current: string) { const content = window.prompt('Edit comment', current)?.trim(); if (content && content !== current) await dispatch(editComment({ id: commentId, content })) }
  async function handleDeleteComment(commentId: number) { if (window.confirm('Delete this comment?')) await dispatch(deleteComment(commentId)) }

  async function submitInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!activeStory || !inviteEmail.trim()) return
    try {
      await dispatch(inviteContributor({ storyId: activeStory.id, email: inviteEmail.trim() })).unwrap()
      await dispatch(loadStories()).unwrap()
      setInviteEmail('')
      setNotice('Your invitation is on its way.')
    } catch (reason) {
      setNotice(typeof reason === 'string' ? reason : 'That collaborator could not be added.')
    }
  }

  async function handleSignOut() {
    try {
      await dispatch(signOut()).unwrap()
    } finally {
      dispatch(clearStories())
      setDialog(null)
      setNotice('You have signed out.')
    }
  }

  async function openStory(story: Story) {
    setActiveStoryId(story.id)
    setDialog('story')
    setNotice('')
    void dispatch(loadComments(story.id))
  }

  async function handleDeleteStory(story: Story) {
    if (!window.confirm(`Delete “${story.title}”? This cannot be undone.`)) return
    try {
      await dispatch(deleteStory(story.id)).unwrap()
      setDialog(null)
      setActiveStoryId(null)
      setNotice('Story deleted.')
    } catch (reason) {
      setNotice(typeof reason === 'string' ? reason : 'Story could not be deleted.')
    }
  }

  async function handleRemoveContributor(contributorId: number) {
    if (!activeStory) return
    try {
      await dispatch(removeContributor({ contributorId, storyId: activeStory.id })).unwrap()
      await dispatch(loadStories()).unwrap()
    } catch (reason) {
      setNotice(typeof reason === 'string' ? reason : 'Collaborator could not be removed.')
    }
  }

  const storyList = visibleStories.map((story, index) => (
    <article className="story-card" key={story.id}>
      <button className="story-cover" style={{ backgroundImage: `url(${coverFor(story.id)})` }} onClick={() => void openStory(story)} aria-label={`Open ${story.title}`}>
        <span className="cover-index">{String(index + 1).padStart(2, '0')}</span>
      </button>
      <div className="story-card-copy">
        <div className="story-card-meta">
          <span>{story.author_id === user?.id ? 'YOUR STORY' : `BY ${story.author.toUpperCase()}`}</span>
          <span>{story.contributors.length + 1} voices</span>
        </div>
        <button className="story-title" onClick={() => void openStory(story)}>{story.title}</button>
        <p>{story.content.slice(0, 112)}{story.content.length > 112 ? '…' : ''}</p>
        <div className="story-card-foot">
          <div className="avatar-stack" aria-label={`${story.contributors.length + 1} contributors`}>
            <span className="avatar avatar-ink">{story.author.slice(0, 1).toUpperCase()}</span>
            {story.contributors.slice(0, 2).map((person, personIndex) => <span className={`avatar avatar-${personIndex}`} key={person.id}>{person.username.slice(0, 1).toUpperCase()}</span>)}
            {story.contributors.length > 2 && <span className="avatar avatar-more">+{story.contributors.length - 2}</span>}
          </div>
          <span className="updated-label">{new Date(story.updated_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
        </div>
      </div>
    </article>
  ))

  return (
    <div className="app-shell">
      <header className="topbar">
        <a href="#top" className="wordmark" aria-label="Storyweaver home">
          <span className="wordmark-icon"><Feather size={19} strokeWidth={1.8} /></span>
          <span>storyweaver<span className="wordmark-period">.</span></span>
        </a>
        <nav className="top-nav" aria-label="Main navigation">
          <a className="nav-link active" href="#library">The library</a>
          <a className="nav-link" href="#how-it-works">Our room</a>
        </nav>
        <div className="top-actions">
          <button className="icon-button theme-toggle" title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          {authStatus === 'checking' ? <span className="session-check"><LoaderCircle size={16} className="spin" /> checking</span> : user ? (
            <div className="user-menu">
              <span className="user-avatar">{user.username.slice(0, 1).toUpperCase()}</span>
              <span className="user-name">{user.username}</span>
              <button className="icon-button logout-button" title="Sign out" aria-label="Sign out" onClick={() => void handleSignOut()}><LogOut size={16} /></button>
            </div>
          ) : <div className="guest-actions">
            <button className="button button-outline sign-in-button" onClick={() => openAuth('login')}>Sign in</button>
            <button className="button button-light sign-up-button" onClick={() => openAuth('signup')}>Create account</button>
          </div>}
        </div>
      </header>

      <main id="top">
        <section className="hero-band" aria-label="Storyweaver introduction">
          <div className="hero-photo" />
          <div className="hero-content">
            <div className="eyebrow"><span className="eyebrow-line" /> A SHARED WRITING ROOM <span className="eyebrow-count">NO. 01 / 2026</span></div>
            <h1>Good stories<br />are <em>never</em> solitary.</h1>
            <div className="hero-bottom">
              <p>One small beginning. A few curious minds. See where the story takes you.</p>
              <button className="button button-amber" onClick={() => user ? openEditor() : openAuth('signup')}>
                Begin a story
              </button>
            </div>
          </div>
          <div className="hero-caption"><span>THE QUIET ART OF</span><strong>WRITING TOGETHER</strong></div>
        </section>

        <section className="workspace" id="library">
          <div className="section-heading-row">
            <div>
              <div className="eyebrow eyebrow-muted"><span className="eyebrow-line" /> THE COMMONPLACE BOOK</div>
              <h2>Stories in the making<span className="heading-dot">.</span></h2>
            </div>
            <button className="button button-light" onClick={() => user ? openEditor() : openAuth('signup')}>
              <Plus size={17} /> New story
            </button>
          </div>

          <div className="library-toolbar">
            <div className="filter-tabs" role="group" aria-label="Filter stories">
              {([
                ['all', 'Everything', items.length],
                ['mine', 'Mine', myStories],
                ['collaborating', 'With me', collaborativeStories],
              ] as const).map(([value, label, count]) => (
                <button key={value} className={`filter-tab ${storyFilter === value ? 'selected' : ''}`} onClick={() => setStoryFilter(value)}>
                  {label}<span>{count}</span>
                </button>
              ))}
            </div>
            <label className="search-box">
              <Search size={16} />
              <input aria-label="Search stories" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Find a story" />
              <Filter size={15} className="search-filter-icon" />
            </label>
          </div>

          {error && <div className="inline-alert" role="alert"><CircleHelp size={16} />{error}</div>}
          {storiesStatus === 'loading' && items.length === 0 ? (
            <div className="loading-state"><LoaderCircle className="spin" size={22} /> Gathering the pages…</div>
          ) : storyList.length ? (
            <div className="story-grid">{storyList}</div>
          ) : (
            <div className="empty-library">
              <div className="empty-symbol"><BookOpen size={24} strokeWidth={1.4} /></div>
              <div>
                <span className="empty-kicker">A BLANK PAGE IS AN INVITATION</span>
                <h3>{search ? 'No stories found.' : user ? 'Your next story starts here.' : 'Make room for a story.'}</h3>
                <p>{search ? 'Try another title, author, or phrase.' : 'Start with a line, then invite someone to help you find the next one.'}</p>
              </div>
              <button className="text-action" onClick={() => user ? openEditor() : openAuth('signup')}>
                {user ? 'Write the first line' : 'Create your account'}
              </button>
            </div>
          )}
        </section>

        <section className="room-note" id="how-it-works">
          <span className="note-mark"><Feather size={19} /></span>
          <p>Every voice leaves a mark.<br /><em>The best stories keep them all.</em></p>
          <span className="note-signature">A ROOM FOR MANY AUTHORS</span>
        </section>
      </main>

      <footer className="site-footer">
        <span>STORYWEAVER <span className="footer-dot">●</span> A SHARED WRITING ROOM</span>
        <span>MADE FOR THE STORIES BETWEEN US</span>
      </footer>

      {dialog && <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setDialog(null) }}>
        <section className={`dialog-panel ${dialog === 'story' ? 'story-dialog' : ''}`} role="dialog" aria-modal="true" aria-labelledby="dialog-title">
          <button className="icon-button dialog-close" aria-label="Close dialog" onClick={() => setDialog(null)}><X size={19} /></button>

          {(dialog === 'login' || dialog === 'signup') && <>
            <div className="dialog-symbol"><Feather size={19} /></div>
            <div className="eyebrow eyebrow-muted"><span className="eyebrow-line" /> YOUR WRITING ROOM</div>
            <h2 id="dialog-title">{authMode === 'login' ? 'Welcome back.' : 'Come write with us.'}</h2>
            <p className="dialog-intro">{authMode === 'login' ? 'Pick up where the story left off.' : 'A good story gets better with another voice.'}</p>
            <form className="stacked-form" onSubmit={(event) => void submitAuth(event)}>
              <label>Email address<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label>
              <label>Password<input name="password" type="password" autoComplete={authMode === 'login' ? 'current-password' : 'new-password'} minLength={8} placeholder="At least 8 characters" required /></label>
              {formError && <p className="form-error" role="alert">{formError}</p>}
              <button className="button button-amber form-submit" type="submit">{authMode === 'login' ? 'Sign in' : 'Create account'}</button>
            </form>
            <p className="switch-auth">{authMode === 'login' ? 'New around here?' : 'Already have a room?'} <button onClick={() => { setAuthMode(authMode === 'login' ? 'signup' : 'login'); setFormError('') }}>{authMode === 'login' ? 'Create an account' : 'Sign in'}</button></p>
          </>}

          {dialog === 'editor' && <>
            <button className="back-link" onClick={() => setDialog(editingStory ? 'story' : null)}>Back to the library</button>
            <div className="eyebrow eyebrow-muted"><span className="eyebrow-line" /> {editingStory ? 'KEEP THE THREAD GOING' : 'A NEW BEGINNING'}</div>
            <h2 id="dialog-title">{editingStory ? 'Edit your story.' : 'Start with a line.'}</h2>
            <form className="stacked-form story-form" onSubmit={(event) => void submitStory(event)}>
              <label>Working title<input name="title" defaultValue={editingStory?.title ?? ''} maxLength={255} placeholder="A title, for now" required /></label>
              <label>First lines<textarea name="content" defaultValue={editingStory?.content ?? ''} maxLength={50000} rows={9} placeholder="Every good story starts somewhere…" required /></label>
              {formError && <p className="form-error" role="alert">{formError}</p>}
              <button className="button button-amber form-submit" disabled={saving} type="submit">{saving ? <LoaderCircle size={16} className="spin" /> : <FilePenLine size={16} />}{saving ? 'Saving…' : 'Save story'}</button>
            </form>
          </>}

          {dialog === 'story' && activeStory && <>
            <div className="story-detail-cover" style={{ backgroundImage: `url(${coverFor(activeStory.id)})` }}>
              <span>{activeStory.author_id === user?.id ? 'YOUR STORY' : `A STORY BY ${activeStory.author.toUpperCase()}`}</span>
              <span>{new Date(activeStory.updated_at).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <div className="story-detail-body">
              <div className="story-detail-heading">
                <div><h2 id="dialog-title">{activeStory.title}</h2><p className="story-byline">Written by {activeStory.author}{activeStory.contributors.length ? ` with ${activeStory.contributors.map((person) => person.username).join(', ')}` : ''}</p></div>
                {(activeStory.author_id === user?.id || activeStory.contributors.some((person) => person.user_id === user?.id)) && <button className="button button-outline edit-story-button" onClick={() => openEditor(activeStory)}><FilePenLine size={15} /> Edit</button>}
              </div>
              <article className="story-prose">{activeStory.content}</article>
              <div className="detail-tools">
                <div className="contributors-block">
                  <div className="detail-label"><Users size={14} /> THE PEOPLE IN THIS STORY</div>
                  <div className="contributor-list">
                    <span className="contributor-chip"><span className="avatar avatar-ink">{activeStory.author.slice(0, 1).toUpperCase()}</span>{activeStory.author}<span className="author-tag">AUTHOR</span></span>
                    {activeStory.contributors.map((person) => <span className="contributor-chip" key={person.id}><span className="avatar avatar-0">{person.username.slice(0, 1).toUpperCase()}</span>{person.username}
                      {activeStory.author_id === user?.id && <button className="remove-person" title={`Remove ${person.username}`} aria-label={`Remove ${person.username}`} onClick={() => void handleRemoveContributor(person.id)}><X size={13} /></button>}
                    </span>)}
                  </div>
                  {activeStory.author_id === user?.id && <form className="invite-form" onSubmit={(event) => void submitInvite(event)}>
                    <input type="email" aria-label="Collaborator email" value={inviteEmail} onChange={(event) => setInviteEmail(event.target.value)} placeholder="Invite by email" required />
                    <button className="icon-button invite-submit" title="Invite collaborator" aria-label="Invite collaborator" type="submit"><Plus size={17} /></button>
                  </form>}
                </div>
                <div className="comments-block">
                  <div className="detail-label"><MessageCircle size={14} /> MARGIN NOTES <span>{comments[activeStory.id]?.length ?? 0}</span>{activeStory.author_id === user?.id && <button className="comment-setting" onClick={() => void dispatch(setCommentsEnabled({ storyId: activeStory.id, enabled: false }))}>disable comments</button>}</div>
                  <div className="comment-list">
                    {(comments[activeStory.id] ?? []).map((comment) => <article className="comment-item" key={comment.id}><span className="comment-avatar">{comment.username.slice(0, 1).toUpperCase()}</span><div><strong>{comment.username}</strong><p>{comment.content}</p><div className="comment-actions"><button onClick={() => void dispatch(reactToComment({ id: comment.id, reaction: 'heart' }))}>heart {comment.reactions?.heart ?? 0}</button>{comment.user_id === user?.id && <button onClick={() => void handleEditComment(comment.id, comment.content)}>edit</button>}{(comment.user_id === user?.id || activeStory.author_id === user?.id) && <button onClick={() => void handleDeleteComment(comment.id)}>delete</button>}</div></div></article>)}
                    {comments[activeStory.id]?.length === 0 && <p className="no-comments">Leave the first note in the margin.</p>}
                  </div>
                  <form className="comment-form" onSubmit={(event) => void submitComment(event)}>
                    <input aria-label="Write a comment" value={commentText} onChange={(event) => setCommentText(event.target.value)} placeholder="Add a thought…" maxLength={2000} required />
                    <button className="icon-button comment-submit" title="Post comment" aria-label="Post comment" type="submit"><Send size={15} /></button>
                  </form>
                </div>
              </div>
              {notice && <p className="notice-line" role="status">{notice}<button aria-label="Dismiss" onClick={() => setNotice('')}><X size={13} /></button></p>}
              {activeStory.author_id === user?.id && <button className="delete-story" onClick={() => void handleDeleteStory(activeStory)}>Delete story</button>}
            </div>
          </>}
        </section>
      </div>}

      {notice && !dialog && <div className="toast" role="status"><Check size={15} /> {notice}<button aria-label="Dismiss" onClick={() => setNotice('')}><X size={14} /></button></div>}
    </div>
  )
}

export default App
