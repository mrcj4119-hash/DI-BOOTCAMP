CREATE INDEX IF NOT EXISTS stories_author_id_idx ON stories(author_id);
CREATE INDEX IF NOT EXISTS contributors_story_id_idx ON contributors(story_id);
CREATE INDEX IF NOT EXISTS comments_story_id_idx ON comments(story_id, created_at);
