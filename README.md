# Shopee Ultimate Case Challenge (SUCC)
## Smart COD Reliability & Delivery Optimization System

A modern, interactive web application built with **Next.js 16**, **TypeScript**, **Tailwind CSS**, and **shadcn UI structure**, featuring the **`scroll-expansion-hero`** component from [21st.dev](https://21st.dev).

---

## 🌟 Executive Summary & Content from Case Presentation (PDF)

This project translates the strategic solution from the **Shopee Ultimate Case Challenge** into an interactive digital experience:

### 1. Slide 1: Where The Problem Really Is
- **10.6x Higher COD Risk**: COD failed delivery rate is **2.61%** versus just **0.25%** for non-COD (prepaid).
- **35% Share of Total Orders**: Over one-third of all Shopee marketplace transactions are Cash on Delivery.
- **85% Of All Failed Deliveries**: Because COD is 35% of orders and fails at 10.6x the rate, ~85% of all delivery failures on Shopee are concentrated in COD parcels.
- *Interactive feature*: Real-time **Monthly Scale & Financial Loss Calculator** demonstrating courier reverse logistics cost waste and multi-million THB savings.

### 2. Slide 2: Who Should Shopee Target?
> *"Instead of treating every COD buyer the same, segment buyers by delivery reliability."*
- **Low-Risk Buyers (Score > 80)**: High delivery success history. Continue normal frictionless COD experience.
- **Medium-Risk Buyers (Score 50-79)**: Some failed deliveries. Receive automated pre-delivery reminder to confirm availability.
- **High-Risk Buyers (Score 30-49)**: Frequent failed deliveries. Strong warning banner and mandatory OTP delivery confirmation.
- **Repeated High-Risk Buyers (Score < 30)**: Consistent history of failed COD. Deposit or partial prepayment required (฿40 shipping deposit), encouraging switch to ShopeePay or PromptPay.
- *Interactive feature*: **Mobile Checkout Flow Simulation** previewing what the customer sees on their smartphone for each tier.

### 3. Slide 3: Smart COD Reliability System
- Every buyer receives a **dynamic Reliability Score** that updates after every delivery:
  - **Successful Delivery** → Score increases (`+8 pts`)
  - **Failed Delivery / Parcel Refusal** → Score decreases (`-25 pts`)
- Integrates with **EasySell & COD Fraud Risk Scoring**:
  - Rates orders before sellers pack and dispatch.
  - OTP verification for suspicious addresses.
  - Blocks 84% of fake and competitor spam orders.
- *Interactive feature*: **Live Interactive Reliability Meter** where visitors can click to simulate successful or failed deliveries and see real-time score and tier changes.

### 4. Slide 4: Delivery Scheduling Optimization
- **Preferred Delivery Window Flow**:
  1. *Buyer selects delivery window* (Morning, Afternoon, Evening, Weekend).
  2. *Courier schedules delivery* (Zone-clustered routing optimization).
  3. *Reminder sent before delivery* (SMS / App alert 2 hours prior with exact cash amount).
  4. *Higher first-attempt delivery success* (Customer is home with cash prepared).
- **Dual Benefits**:
  - *For Buyers*: Greater convenience, fewer missed deliveries, more timing control.
  - *For Shopee & Sellers*: Higher first-attempt success (+24%), lower return costs, increased customer retention.
- *Interactive feature*: **Interactive Delivery Window Chooser** simulating slot booking.

### 5. Slide 5: Expected Impact & Feasibility
- **Why Our Solution Works**:
  - *Targeted*: Intervene only when risk is high → 90%+ reliable buyers remain 100% frictionless.
  - *Progressive*: Reminder → Warning → Deposit → Increases commitment without banning COD.
  - *Recoverable*: Good delivery history restores status → Restrictions are temporary.
- **Why It Is Feasible**:
  - Uses existing order & delivery history databases.
  - Simple, deterministic rules trigger interventions.
  - AI applied strictly where predictive analytics adds value (fraud rings & routing).
- **KPI Targets & Guardrails**:
  - Core Outcomes: COD Failed Delivery Rate ↓ (Target: <1.10%), First-Attempt Success Rate ↑ (+24%), Repeat Failure Rate ↓ (-72%).
  - Buyer Guardrails: Conversion rate maintained (≥99.4%), GMV volume maintained (100%), buyer complaint rate controlled (<0.05%).

---

## 🛠️ Technical Architecture & 21st.dev Component Integration

### Component Path: `/components/ui/scroll-expansion-hero.tsx`

#### Why `/components/ui` is the Default Standard Path
In **shadcn UI**, the `/components/ui` directory is dedicated to **reusable, atomic, unstyled/styled primitive UI components** (e.g., buttons, dialogs, media expansions, inputs). Separating UI primitives into `/components/ui` provides:
1. **CLI Compatibility**: The shadcn CLI (`npx shadcn@latest add ...`) automatically places atomic primitives into `components/ui` based on `components.json`.
2. **Separation of Concerns**: Feature-specific sections (e.g., `components/sections/ProblemSection.tsx`, `components/Navbar.tsx`) stay distinct from low-level presentation controls.
3. **Clean Module Resolution**: Imports like `@/components/ui/scroll-expansion-hero` remain modular and easy to reuse across multiple pages.

### Required Dependencies
```bash
npm install next framer-motion lucide-react clsx tailwind-merge
```

### Component Props & State Specification
- **`mediaType`** (`"video" | "image"`): Selects whether to render HTML5 video / YouTube embed or Next.js optimized image.
- **`mediaSrc`** (`string`): Media asset source URL (CDN video or high-res Unsplash image).
- **`posterSrc`** (`string`?): Optional video poster thumbnail.
- **`bgImageSrc`** (`string`): Fullscreen background image with subtle darkening overlay.
- **`title`** (`string`): Two-tone headline split dynamically into `firstWord` and `restOfTitle`.
- **`date`** (`string`?): Subtitle, category, or event date indicator.
- **`scrollToExpand`** (`string`?): Interactive call-to-action text.
- **`textBlend`** (`boolean`?): Mix-blend difference styling for high contrast across media.
- **`children`** (`ReactNode`?): Content unveiled when scrollProgress reaches 100%.

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run local development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
npm run start
```

---

## ☁️ Deployment on Render.com (ฟรี & ทำงานตลอด 24 ชม.)

### วิธีที่ 1: Deploy ผ่าน Render Blueprint (แนะนำ - ง่ายสุด 1 คลิก)
1. เข้าไปที่ [Render Dashboard](https://dashboard.render.com/)
2. คลิก **New +** → เลือก **Blueprint**
3. เชื่อมต่อกับ GitHub Repo: `https://github.com/svkhun/Shopee-Ultimate-Case-Challenge.git`
4. Render จะตรวจพบไฟล์ `render.yaml` โดยอัตโนมัติ และตั้งค่า Build / Start Commands ให้เสร็จสรรพ
5. คลิก **Apply** เพื่อเริ่ม Deploy ได้ทันที

### วิธีที่ 2: Deploy ผ่าน Web Service (Manual)
1. ที่ Render Dashboard คลิก **New +** → เลือก **Web Service**
2. เชื่อมต่อกับ GitHub Repository
3. กำหนดการตั้งค่าดังนี้:
   - **Name**: `shopee-ultimate-case-challenge`
   - **Region**: Singapore (ใกล้ประเทศไทยที่สุด)
   - **Branch**: `main`
   - **Root Directory**: (เว้นว่างไว้)
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`
   - **Instance Type**: `Free`
4. เพิ่ม Environment Variable:
   - `NODE_VERSION` = `20.18.0`
5. คลิก **Deploy Web Service**

