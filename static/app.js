/**
 * Shopee Smart COD Reliability Portal
 * Pure Vanilla JavaScript Client Application
 * Communicates with Python FastAPI Backend REST Endpoints
 */

// Application Global State
const appState = {
  currentTab: 'overview',
  edaData: null,
  modelSummary: null,
  currentSimScore: 88.0,
  currentSimConsecFails: 0,
  currentDatasetFilter: 'ALL',
  selectedPhoneWindow: 'MORNING',
  latestScoringRequestId: 0,
  deliveryFeedbackPending: false
};

// =====================================================================
// 1. Multi-Page Navigation & Hash Routing
// =====================================================================

function switchTab(tabId) {
  const validTabs = ['overview', 'slide1', 'slide2', 'slide3', 'slide4', 'slide5', 'simulator', 'dataset', 'tutorial', 'team'];
  if (!validTabs.includes(tabId)) {
    tabId = 'overview';
  }

  appState.currentTab = tabId;

  // Update nav buttons and dropdown items
  document.querySelectorAll('.nav-tab-btn, .dropdown-item').forEach(btn => {
    if (btn.getAttribute('data-target') === tabId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Sync Case Slides dropdown trigger active state & label
  const isSlide = ['slide1', 'slide2', 'slide3', 'slide4', 'slide5'].includes(tabId);
  const deckTrigger = document.getElementById('nav-deck-trigger');
  const deckLabel = document.getElementById('nav-deck-label');
  if (deckTrigger) {
    if (isSlide) {
      deckTrigger.classList.add('active');
      const slideLabels = {
        slide1: 'Slide 1: Root Cause',
        slide2: 'Slide 2: 4-Tier Policy',
        slide3: 'Slide 3: Score & EasySell',
        slide4: 'Slide 4: Preferred Window',
        slide5: 'Slide 5: Financial Impact'
      };
      if (deckLabel) deckLabel.textContent = slideLabels[tabId] || 'Case Slides';
    } else {
      deckTrigger.classList.remove('active');
      if (deckLabel) deckLabel.textContent = 'Case Slides';
    }
  }

  // Close dropdown if open
  const dropdown = document.getElementById('nav-deck-dropdown');
  if (dropdown) dropdown.classList.remove('open');

  // Update section views
  document.querySelectorAll('.page-section').forEach(sec => {
    sec.classList.remove('active');
  });

  const activeSection = document.getElementById(`page-${tabId}`);
  if (activeSection) {
    activeSection.classList.add('active');
  }

  // Update URL hash
  if (window.location.hash !== `#${tabId}`) {
    history.pushState(null, '', `#${tabId}`);
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

let deckDropdownTimer = null;

function toggleDeckDropdown(event) {
  event.stopPropagation();
  const dropdown = document.getElementById('nav-deck-dropdown');
  if (dropdown) {
    clearTimeout(deckDropdownTimer);
    dropdown.classList.toggle('open');
  }
}

function initDeckDropdownBehavior() {
  const dropdown = document.getElementById('nav-deck-dropdown');
  if (!dropdown) return;

  dropdown.addEventListener('mouseenter', () => {
    clearTimeout(deckDropdownTimer);
    dropdown.classList.add('open');
  });

  dropdown.addEventListener('mouseleave', () => {
    clearTimeout(deckDropdownTimer);
    deckDropdownTimer = setTimeout(() => {
      dropdown.classList.remove('open');
    }, 240);
  });
}

document.addEventListener('click', (e) => {
  const dropdown = document.getElementById('nav-deck-dropdown');
  if (dropdown && !dropdown.contains(e.target)) {
    clearTimeout(deckDropdownTimer);
    dropdown.classList.remove('open');
  }
});

window.addEventListener('hashchange', () => {
  const hash = window.location.hash.replace('#', '');
  if (hash) {
    switchTab(hash);
  }
});

// =====================================================================
// 2. Data Fetching & UI Population
// =====================================================================

async function loadEdaMetrics() {
  try {
    const res = await fetch('/api/eda/metrics');
    if (!res.ok) throw new Error('Failed to load EDA metrics');
    const data = await res.json();
    appState.edaData = data;

    // Populate Slide 1
    const s1 = data.slide_1_root_cause;
    if (s1) {
      document.getElementById('eda-cod-mix').textContent = `${s1.cod_share_of_orders_pct}% (${data.dataset_metrics.cod_order_count.toLocaleString()})`;
      document.getElementById('eda-prepaid-mix').textContent = `${s1.prepaid_share_of_orders_pct}% (${data.dataset_metrics.prepaid_order_count.toLocaleString()})`;
      document.getElementById('eda-cod-rate').textContent = `${s1.cod_failed_delivery_rate_pct}%`;
      document.getElementById('eda-prepaid-rate').textContent = `${s1.prepaid_failed_delivery_rate_pct}%`;
      document.getElementById('eda-stat-ratio').textContent = `${s1.risk_multiplier}×`;
      document.getElementById('eda-stat-z').textContent = `z = ${s1.z_statistic}`;
      document.getElementById('eda-stat-p').textContent = `< 0.000001 (Significant)`;
      document.getElementById('eda-stat-share').textContent = `${s1.cod_share_of_all_failures_pct}%`;

      document.getElementById('kpi-risk-ratio').textContent = `${s1.risk_multiplier}×`;
      document.getElementById('kpi-failure-share').textContent = `${Math.round(s1.cod_share_of_all_failures_pct)}%`;
    }

    // Populate Slide 4
    const s4 = data.slide_4_scheduling_impact;
    if (s4) {
      document.getElementById('win-first-with').textContent = `${s4.first_attempt_success_with_window_pct}%`;
      document.getElementById('win-first-without').textContent = `${s4.first_attempt_success_without_window_pct}%`;
      document.getElementById('win-boost-pct').textContent = `+${s4.first_attempt_relative_boost_pct}%`;
      document.getElementById('win-fail-reduct').textContent = `-${s4.failure_reduction_from_window_pct}% reduction`;
      document.getElementById('kpi-window-uplift').textContent = `+${s4.first_attempt_relative_boost_pct}%`;
    }

    // Populate Slide 5
    const s5 = data.slide_5_financial_impact;
    if (s5) {
      const monthlyLossM = (s5.monthly_reverse_logistics_waste_thb / 1e6).toFixed(2);
      const monthlySavM = (s5.estimated_monthly_savings_thb / 1e6).toFixed(2);
      const annualSavM = (s5.estimated_annual_savings_thb / 1e6).toFixed(1);

      document.getElementById('fin-baseline-waste-val').textContent = `${monthlyLossM}M`;
      document.getElementById('fin-monthly-savings-val').textContent = `${monthlySavM}M`;
      document.getElementById('fin-annual-savings-val').textContent = `${annualSavM}M`;
    }

  } catch (err) {
    console.error('Error fetching EDA metrics:', err);
  }
}

async function loadModelSummary() {
  try {
    const res = await fetch('/api/model/summary');
    if (!res.ok) throw new Error('Failed to load model summary');
    const data = await res.json();
    appState.modelSummary = data;

    // Render feature importance ranking
    const container = document.getElementById('feature-importance-container');
    if (container && data.feature_importance_top) {
      container.innerHTML = '';
      const topItems = data.feature_importance_top.slice(0, 6);
      const maxImp = Math.max(...topItems.map(i => i.importance));

      topItems.forEach(item => {
        const pct = Math.round((item.importance / maxImp) * 100);
        const readableName = item.feature
          .replace('num__', '')
          .replace('cat__', '')
          .replace(/_/g, ' ')
          .replace(/\b\w/g, l => l.toUpperCase());

        const barHtml = `
          <div class="feat-bar-row">
            <div class="feat-bar-header">
              <span style="color:#cbd5e1;">${readableName}</span>
              <span class="mono" style="color:var(--shopee-orange); font-weight:600;">${(item.importance * 100).toFixed(1)}%</span>
            </div>
            <div class="feat-bar-track">
              <div class="feat-bar-fill" style="width: ${pct}%;"></div>
            </div>
          </div>
        `;
        container.insertAdjacentHTML('beforeend', barHtml);
      });
    }

  } catch (err) {
    console.error('Error fetching model summary:', err);
  }
}

// =====================================================================
// 3. Interactive Shopee Smartphone Simulation
// =====================================================================

function selectPhoneWindow(windowType) {
  appState.selectedPhoneWindow = windowType;
  const chipKeys = ['morning', 'afternoon', 'evening', 'weekend'];
  chipKeys.forEach(k => {
    const chip = document.getElementById(`chip-${k}`);
    if (chip) {
      if (k.toUpperCase() === windowType) {
        chip.classList.add('selected');
      } else {
        chip.classList.remove('selected');
      }
    }
  });

  const winCheck = document.getElementById('input-window');
  if (winCheck) {
    winCheck.checked = true;
    runLiveScoring();
  }
}

function getPolicyTier(score) {
  if (score >= 80) return { label: 'Low Risk (Grade A)', color: 'emerald' };
  if (score >= 50) return { label: 'Medium Risk (Grade B)', color: 'amber' };
  if (score >= 30) return { label: 'High Risk (Grade C)', color: 'orange' };
  return { label: 'Repeated High Risk (Grade D)', color: 'rose' };
}

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) element.textContent = value;
}

function setPhoneFeedbackResult({ type = 'neutral', title, copy, status }) {
  const result = document.getElementById('phone-feedback-result');
  if (result) {
    result.className = `phone-feedback-result${type === 'neutral' ? '' : ` is-${type}`}`;
  }

  setText('phone-feedback-title', title);
  setText('phone-feedback-copy', copy);
  if (status) setText('phone-delivery-status', status);
}

function syncSimulationScore(score, consecutiveFailures, { preserveFeedback = false } = {}) {
  const normalizedScore = Number(score);
  const normalizedFailures = Number(consecutiveFailures);
  const tier = getPolicyTier(normalizedScore);

  appState.currentSimScore = normalizedScore;
  appState.currentSimConsecFails = normalizedFailures;

  setText('phone-policy-score', normalizedScore.toFixed(1));
  setText('phone-consecutive-failures', normalizedFailures);
  setText('sim-current-score', normalizedScore.toFixed(1));
  setText('sim-consec-fails', normalizedFailures);

  const tierBadge = document.getElementById('sim-current-tier');
  if (tierBadge) {
    tierBadge.className = `tier-badge ${tier.color}`;
    tierBadge.textContent = tier.label;
  }

  if (!preserveFeedback && !appState.deliveryFeedbackPending) {
    setPhoneFeedbackResult({
      title: 'Ready for rider outcome',
      copy: 'Choose an outcome to update the reliability score.',
      status: 'Ready to record'
    });
  }
}

function setDeliveryFeedbackLoading(isLoading) {
  document.querySelectorAll('[data-feedback-control]').forEach(button => {
    button.disabled = isLoading;
    button.setAttribute('aria-busy', String(isLoading));
  });
}

function switchPhoneView(view) {
  const checkoutView = document.getElementById('phone-view-checkout');
  const trackingView = document.getElementById('phone-view-tracking');
  const checkoutTab = document.getElementById('tab-phone-checkout');
  const trackingTab = document.getElementById('tab-phone-tracking');
  const navTitle = document.getElementById('phone-nav-title');
  const bottomBar = document.querySelector('.phone-bottom-bar');
  const scrollContainer = document.querySelector('.phone-screen-scrollable');

  if (view === 'checkout') {
    if (checkoutView) checkoutView.style.display = 'flex';
    if (trackingView) trackingView.style.display = 'none';
    if (checkoutTab) checkoutTab.classList.add('active');
    if (trackingTab) trackingTab.classList.remove('active');
    if (navTitle) navTitle.textContent = 'Checkout';
    if (bottomBar) bottomBar.style.display = 'flex';
  } else {
    if (checkoutView) checkoutView.style.display = 'none';
    if (trackingView) trackingView.style.display = 'flex';
    if (checkoutTab) checkoutTab.classList.remove('active');
    if (trackingTab) trackingTab.classList.add('active');
    if (navTitle) navTitle.textContent = 'SPX Live Tracking';
    if (bottomBar) bottomBar.style.display = 'none';
  }
  if (scrollContainer) {
    scrollContainer.scrollTop = 0;
  }
}

function updateLabInputs({ preserveFeedback = false, skipScoring = false } = {}) {
  const scoreVal = document.getElementById('input-score').value;
  const successVal = document.getElementById('input-success').value;
  const consecVal = document.getElementById('input-consec').value;
  const amountVal = document.getElementById('input-amount').value;
  const distVal = document.getElementById('input-distance').value;
  const ageVal = document.getElementById('input-age').value;

  document.getElementById('val-score').textContent = scoreVal;
  document.getElementById('val-success').textContent = `${successVal}%`;
  document.getElementById('val-consec').textContent = consecVal;
  document.getElementById('val-amount').textContent = `฿${Number(amountVal).toLocaleString()}`;
  document.getElementById('val-distance').textContent = `${distVal} km`;
  document.getElementById('val-age').textContent = `${ageVal} days`;

  // Update in-phone price and doorstep cash due
  const formattedPrice = `฿${Number(amountVal).toLocaleString()}`;
  const phonePrice = document.getElementById('phone-prod-price');
  const phoneTotal = document.getElementById('phone-total-price');
  const phoneCodDue = document.getElementById('phone-cod-due');
  const subtotal = document.getElementById('phone-summary-subtotal');
  const summaryTotal = document.getElementById('phone-summary-total');

  if (phonePrice) phonePrice.textContent = formattedPrice;
  if (phoneTotal) phoneTotal.textContent = formattedPrice;
  if (phoneCodDue) phoneCodDue.textContent = formattedPrice;
  if (subtotal) subtotal.textContent = formattedPrice;
  if (summaryTotal) summaryTotal.textContent = formattedPrice;

  syncSimulationScore(scoreVal, consecVal, { preserveFeedback });

  if (skipScoring) return;

  clearTimeout(window._scoringDebounce);
  window._scoringDebounce = setTimeout(runLiveScoring, 200);
}

async function runLiveScoring() {
  const requestId = ++appState.latestScoringRequestId;
  const payload = {
    order_id: "ORD-" + Math.floor(100000 + Math.random() * 900000),
    buyer_reliability_score: parseFloat(document.getElementById('input-score').value),
    buyer_historical_success_rate: parseFloat(document.getElementById('input-success').value) / 100.0,
    buyer_consecutive_failed_cods: parseInt(document.getElementById('input-consec').value, 10),
    buyer_account_age_days: parseInt(document.getElementById('input-age').value, 10),
    buyer_phone_verified: document.getElementById('input-phone').checked ? 1 : 0,
    buyer_address_changed: document.getElementById('input-address').checked ? 1 : 0,
    order_amount_thb: parseFloat(document.getElementById('input-amount').value),
    window_selected: document.getElementById('input-window').checked ? 1 : 0,
    delivery_distance_km: parseFloat(document.getElementById('input-distance').value),
    item_category: "Electronics",
    courier_code: "Shopee_Xpress"
  };

  try {
    const res = await fetch('/api/predict/risk', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error('Scoring inference failed');
    const result = await res.json();

    if (requestId === appState.latestScoringRequestId) {
      updateSmartphoneScreen(result);
      return result;
    }

  } catch (err) {
    if (requestId === appState.latestScoringRequestId) {
      console.error('Error during ML scoring:', err);
    }
  }
}

function updateSmartphoneScreen(result) {
  const box = document.getElementById('phone-intervention-box');
  const checkoutBtn = document.getElementById('phone-checkout-btn');
  if (!box || !checkoutBtn) return;

  const score = appState.currentSimScore;
  const tier = result.risk_tier;

  if (tier === 'LOW_RISK') {
    box.innerHTML = `
      <div class="phone-intervention-banner banner-grade-a">
        <div style="font-weight:700; display:flex; align-items:center; gap:4px;">
          Reliable Buyer (Score: ${score.toFixed(1)})
        </div>
        <div>Standard 1-click Cash on Delivery. Zero checkout friction.</div>
      </div>
    `;
    checkoutBtn.textContent = 'Place COD Order';
    checkoutBtn.disabled = false;
    checkoutBtn.style.background = 'var(--shopee-orange)';
  } else if (tier === 'MEDIUM_RISK') {
    box.innerHTML = `
      <div class="phone-intervention-banner banner-grade-b">
        <div style="font-weight:700; display:flex; align-items:center; gap:4px;">
          Pre-Delivery Reminder Active (Score: ${score.toFixed(1)})
        </div>
        <div>Automated SMS confirmation will be sent 24h prior. Please confirm your delivery window above.</div>
      </div>
    `;
    checkoutBtn.textContent = 'Confirm COD Order';
    checkoutBtn.disabled = false;
    checkoutBtn.style.background = 'var(--shopee-orange)';
  } else if (tier === 'HIGH_RISK') {
    box.innerHTML = `
      <div class="phone-intervention-banner banner-grade-c">
        <div style="font-weight:700; display:flex; align-items:center; gap:4px;">
          Mandatory SMS OTP Required (Score: ${score.toFixed(1)})
        </div>
        <div>Elevated return risk detected. Please enter the 6-digit verification code sent to your phone.</div>
        <div class="phone-otp-box">
          <div style="font-size:0.7rem; color:#666; margin-bottom:4px;">Enter verification code:</div>
          <div class="otp-inputs">
            <input class="otp-digit" maxlength="1" value="7" readonly>
            <input class="otp-digit" maxlength="1" value="3" readonly>
            <input class="otp-digit" maxlength="1" value="9" readonly>
            <input class="otp-digit" maxlength="1" value="4" readonly>
            <input class="otp-digit" maxlength="1" value="0" readonly>
            <input class="otp-digit" maxlength="1" value="2" readonly>
          </div>
          <div style="font-size:0.68rem; color:var(--shopee-orange);">Resend OTP in 42s</div>
        </div>
      </div>
    `;
    checkoutBtn.textContent = 'Verify OTP & Place Order';
    checkoutBtn.disabled = false;
    checkoutBtn.style.background = 'var(--orange)';
  } else {
    // REPEATED_HIGH_RISK
    box.innerHTML = `
      <div class="phone-intervention-banner banner-grade-d">
        <div style="font-weight:700; display:flex; align-items:center; gap:4px;">
          COD Restricted (Score: ${score.toFixed(1)})
        </div>
        <div>Due to multiple previous failed deliveries, standard COD is restricted for this account.</div>
        <div class="phone-deposit-box">
          <div style="font-size:0.74rem; font-weight:700; color:#111;">Option 1: Reverse Logistics Deposit</div>
          <div style="font-size:0.68rem; color:#666; margin-top:2px;">Pay ฿40 logistics commitment. 100% refunded when parcel is collected.</div>
          <button class="deposit-action-btn" onclick="showPhoneModal('฿40 Deposit Authorized!', 'Your deposit has been secured. Order dispatched with reverse logistics guarantee.')">
            Pay ฿40 Deposit & Dispatch
          </button>
          <div style="border-top:1px dashed #ddd; margin:6px 0; padding-top:6px; font-size:0.72rem; color:#444;">
            <strong>Option 2:</strong> Switch to PromptPay / Credit Card (0% Extra Fee)
          </div>
        </div>
      </div>
    `;
    checkoutBtn.textContent = 'Deposit or Prepaid Only';
    checkoutBtn.disabled = true;
    checkoutBtn.style.background = '#94a3b8';
  }
}

let phoneModalCallback = null;

function showPhoneModal(title, message, onConfirm = null) {
  const overlay = document.getElementById('phone-modal-overlay');
  const titleEl = document.getElementById('phone-modal-title');
  const bodyEl = document.getElementById('phone-modal-body');
  if (overlay && titleEl && bodyEl) {
    titleEl.textContent = title;
    bodyEl.textContent = message;
    phoneModalCallback = onConfirm;
    overlay.style.display = 'flex';
  }
}

function closePhoneModal() {
  const overlay = document.getElementById('phone-modal-overlay');
  if (overlay) {
    overlay.style.display = 'none';
  }
}

function confirmPhoneModal() {
  closePhoneModal();
  if (typeof phoneModalCallback === 'function') {
    phoneModalCallback();
    phoneModalCallback = null;
  }
}

function handlePhoneOrderClick() {
  const btn = document.getElementById('phone-checkout-btn');
  const originalText = btn.textContent;
  btn.textContent = 'Processing...';
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = originalText;
    btn.disabled = false;
    showPhoneModal(
      'Shopee Order Placed Successfully!',
      'Your Cash on Delivery order is confirmed! Shopee Xpress is dispatching your package. Switching to Doorstep Delivery simulation...',
      () => {
        switchPhoneView('tracking');
      }
    );
  }, 350);
}

// =====================================================================
// 4. Scenario Presets & Simulation
// =====================================================================

function applyScenarioPreset(grade) {
  // Update active chip style
  ['a', 'b', 'c', 'd'].forEach(g => {
    const chip = document.getElementById(`preset-grade-${g}`);
    if (chip) {
      if (g.toUpperCase() === grade) chip.classList.add('active');
      else chip.classList.remove('active');
    }
  });

  const scoreInput = document.getElementById('input-score');
  const successInput = document.getElementById('input-success');
  const consecInput = document.getElementById('input-consec');
  const amountInput = document.getElementById('input-amount');
  const distInput = document.getElementById('input-distance');
  const ageInput = document.getElementById('input-age');
  const phoneInput = document.getElementById('input-phone');
  const addressInput = document.getElementById('input-address');
  const windowInput = document.getElementById('input-window');

  if (grade === 'A') {
    scoreInput.value = 90;
    successInput.value = 98;
    consecInput.value = 0;
    amountInput.value = 1850;
    distInput.value = 8;
    ageInput.value = 520;
    phoneInput.checked = true;
    addressInput.checked = false;
    windowInput.checked = true;
    selectPhoneWindow('MORNING');
  } else if (grade === 'B') {
    scoreInput.value = 65;
    successInput.value = 87;
    consecInput.value = 0;
    amountInput.value = 2100;
    distInput.value = 14;
    ageInput.value = 240;
    phoneInput.checked = true;
    addressInput.checked = false;
    windowInput.checked = true;
    selectPhoneWindow('AFTERNOON');
  } else if (grade === 'C') {
    scoreInput.value = 40;
    successInput.value = 70;
    consecInput.value = 1;
    amountInput.value = 2600;
    distInput.value = 22;
    ageInput.value = 85;
    phoneInput.checked = false;
    addressInput.checked = true;
    windowInput.checked = false;
  } else if (grade === 'D') {
    scoreInput.value = 18;
    successInput.value = 38;
    consecInput.value = 3;
    amountInput.value = 3200;
    distInput.value = 28;
    ageInput.value = 45;
    phoneInput.checked = false;
    addressInput.checked = true;
    windowInput.checked = false;
  }

  updateLabInputs();
  runLiveScoring();
}

// =====================================================================
// 5. Rider Delivery Outcome Simulation (+8 / -20 Dynamic Loop)
// =====================================================================

async function handleDeliveryFeedback(eventOutcome) {
  if (appState.deliveryFeedbackPending) return;

  const currentScore = parseFloat(document.getElementById('input-score').value);
  const currentConsec = parseInt(document.getElementById('input-consec').value, 10);
  const isDelivered = eventOutcome === 'DELIVERED';

  appState.deliveryFeedbackPending = true;
  appState.latestScoringRequestId += 1;
  setDeliveryFeedbackLoading(true);
  setPhoneFeedbackResult({
    type: 'pending',
    title: 'Recording delivery outcome…',
    copy: 'Updating the shared reliability score and policy tier.',
    status: 'Updating…'
  });

  try {
    const res = await fetch('/api/orders/simulate-feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        current_score: currentScore,
        current_consecutive_failed: currentConsec,
        delivery_event: eventOutcome,
        reason: eventOutcome === 'DELIVERED' ? 'Customer collected package at doorstep' : 'Customer refused parcel / unreachable (RTO)'
      })
    });

    if (!res.ok) throw new Error('Feedback transition failed');
    const data = await res.json();

    // The score control, phone drawer, and scorecard now share this response as one source of truth.
    document.getElementById('input-score').value = data.new_score;
    document.getElementById('input-consec').value = data.new_consecutive_failures;
    updateLabInputs({ preserveFeedback: true, skipScoring: true });
    await runLiveScoring();

    const scoreDelta = `${data.score_delta > 0 ? '+' : '−'}${Math.abs(data.score_delta)}`;
    setPhoneFeedbackResult({
      type: isDelivered ? 'success' : 'failure',
      title: `${isDelivered ? 'Delivery accepted' : 'RTO recorded'} · ${scoreDelta} points`,
      copy: `Score ${data.old_score.toFixed(1)} → ${data.new_score.toFixed(1)}. ${data.current_policy_action}`,
      status: isDelivered ? 'Delivery accepted' : 'RTO recorded'
    });

    // Keep the Slide 3 scorecard in sync without interrupting the user with a browser alert.
    const logEl = document.getElementById('sim-feedback-log');
    if (logEl) {
      const timeStr = new Date().toLocaleTimeString();
      const deltaColor = data.score_delta > 0 ? 'var(--emerald)' : 'var(--rose)';
      const sign = data.score_delta > 0 ? '+' : '';
      logEl.innerHTML = `
        <div style="margin-bottom:0.35rem;">
          <span class="mono" style="color:var(--text-muted); font-size:0.75rem;">[${timeStr}]</span>
          <strong style="color:${deltaColor}; margin-left:0.3rem;">Score ${sign}${data.score_delta} Pts</strong>
          <span style="color:var(--text-secondary); margin-left:0.3rem;">(${data.old_score} → ${data.new_score})</span>
        </div>
        <p style="color:var(--text-primary); font-size:0.83rem; margin-bottom:0.4rem;">${data.message}</p>
        <div style="font-size:0.78rem; color:var(--text-muted); padding:0.4rem 0.6rem; background:#faf4e9; border-left:2px solid ${deltaColor};">
          Policy: <span style="color:var(--text-primary);">${data.current_policy_action}</span>
        </div>
      `;
    }

  } catch (err) {
    console.error('Error during feedback simulation:', err);
    setPhoneFeedbackResult({
      type: 'error',
      title: 'Could not record the outcome',
      copy: 'The score was not changed. Please try again.',
      status: 'Update failed'
    });
  } finally {
    appState.deliveryFeedbackPending = false;
    setDeliveryFeedbackLoading(false);
  }
}

// =====================================================================
// 6. Dataset Explorer
// =====================================================================

async function filterDataset(paymentMethod) {
  appState.currentDatasetFilter = paymentMethod;

  ['all', 'cod', 'prepaid'].forEach(key => {
    const btn = document.getElementById(`btn-filter-${key}`);
    if (btn) {
      if (key.toUpperCase() === paymentMethod || (key === 'all' && paymentMethod === 'ALL')) {
        btn.classList.add('btn-primary');
        btn.classList.remove('btn-secondary');
      } else {
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-secondary');
      }
    }
  });

  await refreshDatasetSample();
}

async function refreshDatasetSample() {
  const tbody = document.getElementById('dataset-tbody');
  tbody.innerHTML = `<tr><td colspan="10" style="text-align:center; padding:1.5rem; color:var(--text-muted);">Fetching sample from CSV...</td></tr>`;

  try {
    let url = '/api/dataset/sample?limit=14';
    if (appState.currentDatasetFilter !== 'ALL') {
      url += `&payment_method=${appState.currentDatasetFilter}`;
    }

    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to load dataset sample');
    const data = await res.json();

    tbody.innerHTML = '';
    data.records.forEach(r => {
      const isFailed = r.is_failed_delivery === 1;
      const statusColor = isFailed ? 'var(--rose)' : 'var(--emerald)';
      const statusBg = isFailed ? 'var(--rose-bg)' : 'var(--emerald-bg)';

      let tierColor = 'var(--text-secondary)';
      if (r.buyer_risk_tier === 'LOW_RISK') tierColor = 'var(--emerald)';
      else if (r.buyer_risk_tier === 'MEDIUM_RISK') tierColor = 'var(--amber)';
      else if (r.buyer_risk_tier === 'HIGH_RISK') tierColor = 'var(--orange)';
      else if (r.buyer_risk_tier === 'REPEATED_HIGH_RISK') tierColor = 'var(--rose)';

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="mono" style="font-weight:600;">${r.order_id}</td>
        <td class="mono" style="color:var(--text-secondary);">${r.buyer_id}</td>
        <td><span style="color:${tierColor}; font-weight:600; font-size:0.78rem;">${r.buyer_risk_tier}</span></td>
        <td class="mono">${r.buyer_reliability_score.toFixed(1)}</td>
        <td><span class="mono" style="padding:2px 6px; border-radius:4px; background:${r.payment_method === 'COD' ? 'rgba(238,77,45,0.15)' : 'rgba(255,255,255,0.06)'}; color:${r.payment_method === 'COD' ? 'var(--shopee-orange)' : 'var(--text-secondary)'}; font-weight:600;">${r.payment_method}</span></td>
        <td class="mono">฿${r.order_amount_thb.toFixed(2)}</td>
        <td>${r.item_category}</td>
        <td class="mono" style="color:var(--text-muted);">${r.preferred_window}</td>
        <td class="mono" style="text-align:center;">${r.delivery_attempts}</td>
        <td>
          <span style="background:${statusBg}; color:${statusColor}; font-size:0.75rem; font-weight:600; padding:2px 8px; border-radius:9999px;">
            ${r.delivery_status}
          </span>
        </td>
      `;
      tbody.appendChild(tr);
    });

  } catch (err) {
    console.error('Error loading dataset records:', err);
    tbody.innerHTML = `<tr><td colspan="10" style="text-align:center; padding:1.5rem; color:var(--rose);">Failed to retrieve records from server.</td></tr>`;
  }
}

// =====================================================================
// 7. Application Initialization
// =====================================================================

document.addEventListener('DOMContentLoaded', () => {
  const initialHash = window.location.hash.replace('#', '') || 'overview';
  switchTab(initialHash);

  initDeckDropdownBehavior();
  loadEdaMetrics();
  loadModelSummary();
  applyScenarioPreset('A');
  filterDataset('ALL');
});
