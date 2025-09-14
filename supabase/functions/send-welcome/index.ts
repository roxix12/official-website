// Supabase Edge Function (Deno) — denomailer based
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

// Email Templates - Production Ready
import { 
  tplWelcomeHTML, 
  tplWelcomeText, 
  tplAdminHTML, 
  tplAdminText,
  generateTimestamp,
  getUserAgent 
} from "./email-templates.ts";

const HOST   = Deno.env.get("SMTP_HOST")!;
const PORT   = Number(Deno.env.get("SMTP_PORT") || "587");
const SECURE = (Deno.env.get("SMTP_SECURE") || "false").toLowerCase() === "true";
const USER   = Deno.env.get("SMTP_USER")!;
const PASS   = Deno.env.get("SMTP_PASS")!;

const BRAND       = Deno.env.get("BRAND_NAME") || "CDW Burhan";
const FROM_NAME   = Deno.env.get("NEWSLETTER_FROM_NAME") || BRAND;
const FROM_EMAIL  = Deno.env.get("NEWSLETTER_FROM_EMAIL") || USER;
const REPLY_TO    = Deno.env.get("NEWSLETTER_REPLY_TO") || FROM_EMAIL;
const ADMIN       = Deno.env.get("ADMIN_EMAIL") || "";
const NOTIFY_ADMIN= (Deno.env.get("SEND_ADMIN_NOTIFICATIONS") || "true").toLowerCase() === "true";
const ORIGIN      = Deno.env.get("CORS_ORIGIN") || "*";

function cors(h = new Headers()) {
  h.set("Access-Control-Allow-Origin", ORIGIN);
  h.set("Access-Control-Allow-Headers", "authorization,content-type");
  h.set("Access-Control-Allow-Methods", "POST,OPTIONS");
  return h;
}
const isEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

async function sendMail(to: string, subject: string, html: string, text: string) {
  const client = new SMTPClient({
    connection: {
      hostname: HOST,
      port: PORT,
      tls: SECURE || PORT === 465, // 465 => TLS
      auth: { username: USER, password: PASS },
    },
  });
  try {
    await client.send({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to,
      subject,
      content: text,
      html,
      headers: { "Reply-To": REPLY_TO },
    });
  } finally {
    try { await client.close(); } catch {}
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: cors() });
  const headers = cors(new Headers({ "content-type": "application/json" }));

  try {
    const { email } = await req.json();
    if (!isEmail(String(email || ""))) {
      return new Response(JSON.stringify({ ok:false, error:"Invalid email" }), { status:400, headers });
    }

    // Send welcome email with professional template
    await sendMail(
      email,
      `Welcome to ${BRAND} 🎉`,
      tplWelcomeHTML(),
      tplWelcomeText(),
    );

    // Send admin notification with detailed template
    if (NOTIFY_ADMIN && ADMIN) {
      const timestamp = generateTimestamp();
      const userAgent = getUserAgent(req);
      
      await sendMail(
        ADMIN,
        `New subscriber: ${email}`,
        tplAdminHTML(email, { timestamp, userAgent, source: 'website' }),
        tplAdminText(email, { timestamp, userAgent, source: 'website' }),
      );
    }

    return new Response(JSON.stringify({ ok:true }), { status:200, headers });
  } catch (e) {
    const msg = e?.message || String(e);
    console.error("SEND-WELCOME ERROR:", msg);
    return new Response(JSON.stringify({ ok:false, error: msg }), { status:500, headers });
  }
});
