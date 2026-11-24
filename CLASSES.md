# Editing class pages

Open WordPress admin → **Classes**, then select Yoga, Mat Pilates, Therapy &
Stretch, Tone & Sculpt or Private 1:1.

1. Edit the introduction and optional “What to expect” text.
2. Optionally choose a replacement page photo and add an image description.
3. Complete each class type's description, level / suitable audience and duration.
   English names are required. Chinese fields are optional and fall back to English.
4. Add, remove or move types up/down as needed, then click **Save class page**.
5. Use **View English page** / **View Chinese page** to review the saved result.

Saving publishes to the Hostinger staging and GitHub previews on their next page
load. There is no separate draft workflow. Leaving a field blank hides that field;
types without descriptions show a short invitation to contact the studio. No
unconfirmed level or duration has been inserted. The 28 starting types come from
existing schedule names and private-session offerings; verify them before launch.

On mobile, visitors choose a type from the compact dropdown, or use Previous/Next,
to view one detail card at a time. Desktop and tablet (700px and above) retain
the original expandable class-type list. The enquiry button includes the selected type name.
Type ordering follows the WordPress editor. With JavaScript disabled the built
class names remain available as expandable rows.

The fixed category names and URLs stay consistent with navigation:

| Category | Path |
| --- | --- |
| Yoga | `classes/yoga/` |
| Mat Pilates | `classes/mat-pilates/` |
| Therapy & Stretch | `classes/therapy-stretch/` |
| Tone & Sculpt | `classes/tone-sculpt/` |
| Private 1:1 | `classes/private-1-to-1/` |

Chinese versions use the same paths under `zh/`. Home class cards, mobile and
desktop navigation, and footer links point to these pages. Group pages link to
the matching schedule filter; Private 1:1 links to an enquiry.

## Implementation and operation

- Plugin: `wordpress/healthtinity-classes/`; admin page `admin.php?page=ht-classes`.
- The editor requires `edit_pages`, checks a category-specific nonce and sanitizes
  all saved fields. Image IDs must identify actual image attachments. Up to 40
  types per category. Re-activation never overwrites saved content.
- Five options: `htc_yoga`, `htc_mat-pilates`, `htc_therapy-stretch`,
  `htc_tone-sculpt`, `htc_private-1-to-1`. Back up the database to retain edits.
- Read-only feed: `/index.php?rest_route=/healthtinity/v1/classes/yoga&lang=en`.
  Unknown categories return 404; public writes are not registered. Feed responses
  are no-store. WordPress provides CORS for the GitHub preview.
- The static pages hydrate from this feed. `CLASSES_API` overrides the endpoint
  prefix at build time. Default copy in `defaults.json` provides a no-JS/network
  fallback; saved WordPress changes do not rewrite that static HTML or its SEO
  metadata. The eventual WordPress theme migration must render those saved fields
  server-side for production. Current work remains staging, with no DNS cutover.
- Run `wp eval-file tests/classes-integration.php` (use a private server copy):
  20 checks cover sanitization, nonce/capability enforcement, translations,
  save/read round trips, empty types and the read-only API. Fixture edits are
  restored in `finally`.

Backup before installation:
`/home/u146877548/healthtinity-backups/before-classes-20261120-172223/`
contains the previous staging files and WordPress SQL.
