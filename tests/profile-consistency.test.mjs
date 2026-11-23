import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL("../" + path, import.meta.url), "utf8");

const selectedProjects = [
  ["Plex", "https://github.com/musadivarci/PlexV1"],
  ["Aegis", "https://github.com/musadivarci/aegis"],
  ["AI Nexus API", "https://github.com/musadivarci/AI-Nexus-API"],
  ["wondR", "https://github.com/musadivarci/wondr"],
  ["Workout Tracker", "https://github.com/musadivarci/workout-tracker"],
  ["Kura", "https://github.com/musadivarci/Kura"],
];

test("homepage lists all six selected public projects", async () => {
  const html = await read("index.html");
  const section = html.match(/<section id="projects">([\s\S]*?)<\/section>/)?.[1];
  assert.ok(section, "homepage project section must exist");
  for (const [name, url] of selectedProjects) {
    assert.ok(section.includes('href="' + url + '"'), "homepage is missing " + name);
  }
  assert.equal((section.match(/class="project-card"/g) ?? []).length, 6);
});

test("profile.json exposes the canonical profile URL and the same six project URLs", async () => {
  const profile = JSON.parse(await read("profile.json"));
  assert.equal(profile.professional_profile_url, "https://www.musadivarci.com.tr/professional-profile");
  assert.deepEqual(profile.selected_projects.map((project) => project.url), selectedProjects.map((project) => project[1]));
});

test("profile README draft retains the same six project links", async () => {
  const draft = await read("GITHUB_PROFILE_README.md");
  for (const [name, url] of selectedProjects) {
    assert.ok(draft.includes(url), "profile README draft is missing " + name);
  }
});

test("sitemap homepage lastmod reflects the homepage content update", async () => {
  const sitemap = await read("sitemap.xml");
  assert.match(sitemap, /<loc>https:\/\/www\.musadivarci\.com\.tr\/<\/loc>\s*<lastmod>2026-11-23<\/lastmod>/);
});

test("repository README links to the canonical professional profile", async () => {
  const readme = await read("README.md");
  assert.ok(readme.includes("https://www.musadivarci.com.tr/professional-profile"));
  assert.ok(readme.includes("- robots.txt"));
});
