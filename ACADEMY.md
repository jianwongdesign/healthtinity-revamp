# Academy content and enquiries

Updated 21 November 2026. Page source: `src/academy.mjs` (English and Chinese).
This remains a static site page, not a WordPress admin content editor.

## Source and content decisions

User supplied https://ask2929.wixsite.com/my-site-3/courses and requested its
Academy information be arranged on the new page with a contact form.
Read the course index and all four linked detail pages:

- `/courses/200-hours-yoga-teacher-training-(hatha-%26-vinyasa)`
- `/courses/300-hours-yoga-teacher-training-(multi-style)`
- `/courses/reiki-level-1`
- `/courses/reiki-level-2`

All paths are on the Wix site above. Yoga curriculum and assessments are
condensed and translated. Programme images were sourced from those same pages:

- `src/assets/img/academy/yoga-200.jpg`: Wix media `a5035a_7aa852ceae2944b78a14ca5c7d80caa8~mv2.jpeg`
- `src/assets/img/academy/yoga-300.jpg`: Wix media `a5035a_be20ba984046408cb9bfd03a5aa82c9f~mv2.jpg`

The original intakes were in 2023. Do not reinstate their dates, remaining seats,
early-bird offers, deposits, instalments or inclusions without client confirmation.
The old address (230A) is not used; the current site's 246J address is retained.

Reference values are visibly labelled as previously listed, not current offers:

| Course | Previously listed fee | Listed duration |
| --- | --- | --- |
| 200-hour Hatha & Vinyasa | S$3,250 | 10 weeks |
| 300-hour Multi-style | S$5,400 | 13 weeks |
| Reiki Level 1 | S$450 | 1 weekend |
| Reiki Level 2 | S$650 | 2 weekends |

The 300-hour S$5,400 was itself a 2023 early-bird rate on the detailed source;
it is retained only as a clearly historical listing value, not an active offer.
The old 200-hour World Yoga Alliance (India) recognition and certificate claims
need current confirmation. No present accreditation claim is published.
Reiki is described as traditional practice; unsupported energy amplification or
health outcome claims are not repeated. The old source names Robin as instructor;
current workshop instructor is left for confirmation.

## Enquiry form

Fields: name, email, optional mobile, course selection, experience/questions.
Course buttons scroll to the form and preselect the course. Shared contact form
JavaScript prepares a WhatsApp message or email for the visitor to send.
It does not send server-side, store leads in WordPress, or claim submission success.
Recipients: WhatsApp +65 8282 9515; email ask@healthtinity.com. HTML encoding protects
the email from Hostinger's preview proxy. Required fields use browser validation.

## Verification

EN/ZH checked at 320, 390, 820 and 1440px, images loaded, no page overflow.
Course selection and both WhatsApp/email handoffs were intercepted and checked;
no messages were sent. Production DNS and root WordPress site unchanged.
