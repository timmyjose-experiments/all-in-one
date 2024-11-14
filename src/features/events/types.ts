export type Actor = {
  id: number
  login: string
  gravatar_id: string
  url: string
  avatar_url: string
}

export type Owner = {
  login: string
  id: number
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
}

export type Repo = {
  id: number
  name: string
  url: string
  full_name?: string
  owner?: Owner
  private?: boolean
  html_url?: string
  description?: string
  fork?: boolean
  forks_url?: string
  keys_url?: string
  collaborators_url?: string
  teams_url?: string
  hooks_url?: string
  issue_events_url?: string
  events_url?: string
  assignees_url?: string
  branches_url?: string
  tags_url?: string
  blobs_url?: string
  git_tags_url?: string
  git_refs_url?: string
  trees_url?: string
  statuses_url?: string
  languages_url?: string
  stargazers_url?: string
  contributors_url?: string
  subscribers_url?: string
  subscription_url?: string
  commits_url?: string
  git_commits_url?: string
  comments_url?: string
  issue_comment_url?: string
  contents_url?: string
  compare_url?: string
  merges_url?: string
  archive_url?: string
  downloads_url?: string
  issues_url?: string
  pulls_url?: string
  milestones_url?: string
  notifications_url?: string
  labels_url?: string
  releases_url?: string
  created_at?: string
  updated_at?: string
  pushed_at?: string
  git_url?: string
  ssh_url?: string
  clone_url?: string
  svn_url?: string
  homepage?: string
  size?: number
  stargazers_count?: number
  watchers_count?: number
  language?: string
  has_issues?: boolean
  has_downloads?: boolean
  has_wiki?: boolean
  has_pages?: boolean
  forks_count?: number
  mirror_url?: string | null
  open_issues_count?: number
  forks?: number
  open_issues?: number
  watchers?: number
  default_branch?: string
}

export type Commit = {
  sha: string
  author: {
    email: string
    name: string
  }
  message: string
  distinct: boolean
  url: string
}

export type Org = {
  id: 9285252
  login: string
  gravatar_id: string
  url: string
  avatar_url: string
}

export type Author = {
  login: string
  id: number
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
}

export type Release = {
  url: string
  assets_url: string
  upload_url: string
  html_url: string
  id: number
  tag_name: string
  target_commitish: string
  name: string
  draft: boolean
  author: Author
}

export type Uploader = {
  login: string
  id: number
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
}

export type Asset = {
  url: string
  id: number
  name: string
  label: string | null
  uploader: Uploader
  content_type: string
  state: string
  size: number
  download_count: number
  created_at: string
  updated_at: string
  browser_download_url: string
}

export type User = {
  login: string
  id: number
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
}

export type PullRequest = {
    url: string
    id: number
    html_url: string
    diff_url: string
    patch_url: string
    issue_url: string
    number: number
    state: string
    locked: boolean
    title: string
    user: User
    body: string
    created_at: string
    updated_at: string
    closed_at: string | null
    merged_at: string | null
    merge_commit_sha: string | null
    assignee: any | null
    milestone: any | null
    commits_url: string
    review_comments_url: string
    review_comment_url: string
    comments_url: string
    statuses_url: string
    head: {
      label: string
      ref: string
      sha: string
      user: User
      repo: {
      }
    }
}

export type Issue = {
  url: string
  labels_url: string
  comments_url: string
  events_url: string
  html_url: string
  id: number
  number: number
  title: string
  user: User
  labels: Array<any>
  state: string
  locked: boolean
  assignee: null | string
  milestone: null | string
  comments: number
  created_at: string
  updated_at: string
  closed_at: null | string
  body: string
}

export type CreateEventPayload = {
  ref: string
  ref_type: string
  master_branch: string
  description: string
  pusher_type: string
}
export type PushEventPayload = {
  push_id: number
  size: number
  distinct_size: number
  ref: string
  head: string
  before: string
  commits: Commit[]
}

export type CreateEvent = {
  id: string
  type: CreateEvent
  actor: Actor
  repo: Repo
  payload: CreateEventPayload
  public: boolean
  created_at: string
}

export type PushEvent =  {
    id: string
    type: PushEvent
    actor: Actor
    repo: Repo
    payload: PushEventPayload
    public: boolean
    created_at: string
}

export type WatchEventPayload = {
  action: string // action?
}

export type WatchEvent =  {
  id: string
  type: WatchEvent
  actor: Actor
  repo: Repo
  payload: WatchEventPayload
  public: boolean
  created_at: string 
  org: Org
}

export type ReleaseEventPayload = {
  action: string
  release: Release
  prerelease: boolean
  created_at: string
  published_at: string
  assets: Asset[]
}

export type ReleaseEvent = {
    id: string
    type: ReleaseEvent
    actor: Actor
    repo: Repo
    public: boolean
    created_at: string
}

export type PullRequestPayload = {
  action: string
  number: number
  pull_request: PullRequest
}

export type PullRequestEvent = {
  id: string
  type: string
  actor: Actor
  repo: Repo
  payload: PullRequestPayload
}

export type DeleteEventPayload = {
  ref: string
  ref_type: string
  pusher_type: string
}

export type DeleteEvent = {
  id: string
  type: string
  actor: Actor
  repo: Repo
  public: boolean
  created_at: string
  org: Org
}

export type IssuesEvent = {
  id: string
  type: string
  actor: Actor
  repo: Repo
  payload: {
    action: string
    issue: Issue
  }
  public: boolean
  created_at: string
}

export type Event = CreateEvent | PushEvent | WatchEvent | ReleaseEvent | PullRequestEvent | IssuesEvent | DeleteEvent

export type RootEvent = {
  events: Event[]
}