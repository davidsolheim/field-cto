---
id: "0980"
title: "Customize contact form confirmation email for Cursor team"
status: open
priority: high
assignee:
lease_expires:
scope: "Imported from Linear TW-980. Stay inside that description."
acceptance: "Context"
files: []
commit:
reason:
created: "2026-05-23T05:35:10.662Z"
linear_id: "TW-980"
linear_url: "https://linear.app/teton-web-ventures/issue/TW-980/customize-contact-form-confirmation-email-for-cursor-team"
linear_status: "In Review"
linear_status_type: "started"
linear_team: "TW"
linear_project: "cursorfieldcto.com — Field CTO Site"
linear_assignee: "David Solheim <david@tetonweb.com>"
linear_labels: []
linear_priority: "High"
linear_parent: ""
linear_cycle: ""
linear_due: ""
linear_updated: "2026-05-23T05:36:15.844Z"
linear_archived: false
notion_page_id:
notion_url:
---

## Linear import

- Identifier: TW-980
- URL: https://linear.app/teton-web-ventures/issue/TW-980/customize-contact-form-confirmation-email-for-cursor-team
- Linear status: In Review (started)
- Queue status: open
- Team: Teton Web (TW)
- Project: cursorfieldcto.com — Field CTO Site
- Assignee: David Solheim <david@tetonweb.com>
- Labels: none
- Parent: none
- Priority: High
- Estimate: none
- Cycle: none
- Due: none
- Created: 2026-05-23T05:35:10.662Z
- Updated: 2026-05-23T05:36:15.844Z
- Completed: no
- Canceled: no
- Archived: no
- Branch: david/tw-980-customize-contact-form-confirmation-email-for-cursor-team

Queue status follows Water Cooler Protocol. Todo, In Progress, In Review, Triage, and Backlog are `open` so the import does not take a ticket lease or start a review. Done, Canceled, and Blocked use those folders. `linear_status` is the Linear status at import.

## Description

## Context

The site is explicitly positioned for Cursor's hiring, engineering, GTM, and leadership teams. The current confirmation email sent from the contact form on [cursorfieldcto.com](<http://cursorfieldcto.com>) is too generic — it reads as a standard "got your message" reply rather than a tailored response to someone from Cursor.

## Goal

Rewrite `buildConfirmationEmail` in `src/app/actions/contact.ts` so that the reply:

* Thanks the sender specifically for using the form on [cursorfieldcto.com](<http://cursorfieldcto.com>)
* Speaks directly to the Cursor team (hiring, engineering, GTM, leadership)
* Acknowledges that the site was built specifically for them
* Keeps the 48-hour reply promise and direct email fallback (`dts@davidsolheim.com`)
* Keeps the existing `For your records` echo, signature, and monochrome layout
* Updates subject + HTML + plaintext + preheader consistently

## Files

* `src/app/actions/contact.ts` — `buildConfirmationEmail`
