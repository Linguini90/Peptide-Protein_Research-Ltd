// Cloudflare Pages Function — handles POST /api/contact
//
// This is a STUB. It validates the incoming enquiry and returns success,
// but does not yet send an email anywhere — you need to wire up a real
// provider before this collects genuine enquiries.
//
// SETUP STEPS:
// 1. Choose an email-sending provider (e.g. Resend, SendGrid, Mailgun, Postmark).
// 2. In the Cloudflare Pages dashboard: Settings → Environment variables,
//    add a secret e.g. EMAIL_API_KEY with your provider's API key.
// 3. Uncomment and fill in the fetch() call below with your provider's API.
// 4. Set TO_ADDRESS to the real inbox that should receive enquiries.
//
// Until this is wired up, the website's contact form will fall back to
// opening a pre-filled email draft in the visitor's own email client.

const TO_ADDRESS = "info@peptidesynthetics.co.uk";

export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    const { name, email, organisation, enquiryType, message } = body || {};

    if (!name || !email || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: "Invalid submission" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // --- Example using Resend (https://resend.com) — uncomment and configure ---
    // const emailRes = await fetch("https://api.resend.com/emails", {
    //   method: "POST",
    //   headers: {
    //     "Authorization": `Bearer ${context.env.EMAIL_API_KEY}`,
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     from: "Website enquiries <enquiries@peptidesynthetics.co.uk>",
    //     to: [TO_ADDRESS],
    //     reply_to: email,
    //     subject: `Website enquiry: ${enquiryType || "General question"}`,
    //     text: `Name: ${name}\nEmail: ${email}\nOrganisation: ${organisation || "-"}\n\n${message}`,
    //   }),
    // });
    // if (!emailRes.ok) throw new Error("Email provider request failed");

    // Until a provider is wired up above, this stub just acknowledges receipt
    // without actually delivering the message anywhere.
    return new Response(JSON.stringify({ ok: false, wired: false }), {
      status: 501,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
