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
  currentSimScore: 75.0,
  currentSimConsecFails: 0,
  currentDatasetFilter: 'ALL'
};

// =====================================================================
// 1. Multi-Page Navigation & Hash Routing
// =====================================================================

function switchTab(tabId) {
  const validTabs = ['overview', 'slide1', 'slide2', 'slide3', 'slide4', 'slide5', 'mllab', 'dataset'];
  if (!validTabs.includes(tabId)) {
    tabId = 'overview';
  }

  appState.currentTab = tabId;

  // Update nav buttons
  document.querySelectorAll('.nav-tab-btn').forEach(btn => {
    if (btn.getAttribute('data-target') === tabId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Update section views
  document.querySelectorAll('.page-section').forEach(sec => {
    sec.classList.remove('active');
  });

  const activeSection = document.getElementById(`page-${tabId}`);
  if (activeSection) {
    activeSection.classList.add('active');
  }

  // Update URL hash without retriggering scroll jump
  if (window.location.hash !== `#${tabId}`) {
    history.pushState(null, '', `#${tabId}`);
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

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
      document.getElementById('eda-stat-ratio').textContent = `${s1.risk_multiplier}× (PDF Target: 10.6×)`;
      document.getElementById('eda-stat-z').textContent = `z = ${s1.z_statistic}`;
      document.getElementById('eda-stat-p').textContent = `< 0.000001 (Highly Significant)`;
      document.getElementById('eda-stat-share').textContent = `${s1.cod_share_of_all_failures_pct}% (PDF Target: 85%)`;

      document.getElementById('kpi-risk-ratio').textContent = `${s1.risk_multiplier}×`;
      document.getElementById('kpi-failure-share').textContent = `${s1.cod_share_of_all_failures_pct}%`;
    }

    // Populate Slide 4
    const s4 = data.slide_4_scheduling_impact;
    if (s4) {
      document.getElementById('win-first-with').textContent = `${s4.first_attempt_success_with_window_pct}%`;
      document.getElementById('win-first-without').textContent = `${s4.first_attempt_success_without_window_pct}%`;
      document.getElementById('win-boost-pct').textContent = `+${s4.first_attempt_relative_boost_pct}% (PDF Target: +24%)`;
      document.getElementById('win-fail-reduct').textContent = `-${s4.failure_reduction_from_window_pct}% relative reduction`;
      document.getElementById('kpi-window-uplift').textContent = `+${s4.first_attempt_relative_boost_pct}%`;
    }

    // Populate Slide 5
    const s5 = data.slide_5_financial_impact;
    if (s5) {
      const monthlyLossM = (s5.monthly_reverse_logistics_waste_thb / 1e6).toFixed(2);
      const monthlySavM = (s5.estimated_monthly_savings_thb / 1e6).toFixed(2);
      const annualSavM = (s5.estimated_annual_savings_thb / 1e6).toFixed(1);

      document.getElementById('fin-baseline-waste').textContent = `฿${monthlyLossM}M / mo`;
      document.getElementById('fin-monthly-savings').textContent = `฿${monthlySavM}M / mo`;
      document.getElementById('fin-annual-savings').textContent = `฿${annualSavM}M / yr`;
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

    const roc = data.evaluation.roc_auc;
    document.getElementById('hero-auc-display').textContent = roc.toFixed(4);
    document.getElementById('header-model-status').textContent = `Python 3.13 ML Active (AUC: ${roc.toFixed(2)})`;

    // Render feature importance ranking
    const container = document.getElementById('feature-importance-container');
    if (container && data.feature_importance_top) {
      container.innerHTML = '';
      const topItems = data.feature_importance_top.slice(0, 8);
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
              <span>${readableName}</span>
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
// 3. Interactive KBTG Machine Learning Console
// =====================================================================

function updateLabInputs() {
  document.getElementById('val-score').textContent = document.getElementById('input-score').value;
  document.getElementById('val-success').textContent = `${document.getElementById('input-success').value}%`;
  document.getElementById('val-consec').textContent = document.getElementById('input-consec').value;
  document.getElementById('val-amount').textContent = `฿${Number(document.getElementById('input-amount').value).toLocaleString()}`;
  document.getElementById('val-distance').textContent = `${document.getElementById('input-distance').value} km`;
  document.getElementById('val-age').textContent = `${document.getElementById('input-age').value} days`;
  
  // Debounce live scoring
  clearTimeout(window._scoringDebounce);
  window._scoringDebounce = setTimeout(runLiveScoring, 200);
}

async function runLiveScoring() {
  const payload = {
    order_id: "SIM-" + Math.floor(100000 + Math.random() * 900000),
    buyer_reliability_score: parseFloat(document.getElementById('input-score').value),
    buyer_historical_success_rate: parseFloat(document.getElementById('input-success').value) / 100.0,
    buyer_consecutive_failed_cods: parseInt(document.getElementById('input-consec').value, 10),
    buyer_account_age_days: parseInt(document.getElementById('input-age').value, 10),
    buyer_phone_verified: document.getElementById('input-phone').checked ? 1 : 0,
    buyer_address_changed: document.getElementById('input-address').checked ? 1 : 0,
    order_amount_thb: parseFloat(document.getElementById('input-amount').value),
    window_selected: document.getElementById('input-window').checked ? 1 : 0,
    delivery_distance_km: parseFloat(document.getElementById('input-distance').value),
    item_category: document.getElementById('input-category').value,
    courier_code: document.getElementById('input-courier').value
  };

  try {
    const res = await fetch('/api/predict/risk', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error('Scoring inference failed');
    const result = await res.json();

    // Render Score
    const scoreVal = result.reliability_score;
    document.getElementById('pred-score-val').textContent = scoreVal.toFixed(1);
    
    // Circle Color & Badge
    const circle = document.getElementById('pred-score-circle');
    const badge = document.getElementById('pred-tier-badge');
    
    circle.style.borderColor = `var(--${result.badge_color})`;
    badge.className = `tier-badge ${result.badge_color}`;
    badge.textContent = result.tier_display;

    // Metrics
    document.getElementById('pred-fail-prob').textContent = result.predicted_failure_percentage;
    document.getElementById('pred-friction-lvl').textContent = result.friction_level.replace(/_/g, ' ');
    document.getElementById('pred-friction-lvl').style.color = `var(--${result.badge_color})`;

    // Action Text
    document.getElementById('pred-action-text').textContent = result.action;

    // Risk factors
    const factorsList = document.getElementById('pred-factors-list');
    factorsList.innerHTML = '';
    result.risk_factors.forEach(f => {
      const li = document.createElement('li');
      li.textContent = f;
      factorsList.appendChild(li);
    });

  } catch (err) {
    console.error('Error during ML scoring:', err);
  }
}

function loadHighRiskPreset() {
  document.getElementById('input-score').value = 35;
  document.getElementById('input-success').value = 65;
  document.getElementById('input-consec').value = 3;
  document.getElementById('input-amount').value = 2800;
  document.getElementById('input-distance').value = 24;
  document.getElementById('input-age').value = 60;
  document.getElementById('input-category').value = 'Electronics';
  document.getElementById('input-courier').value = 'Flash_Express';
  document.getElementById('input-window').checked = false;
  document.getElementById('input-phone').checked = false;
  document.getElementById('input-address').checked = true;

  updateLabInputs();
  runLiveScoring();
}

function loadLowRiskPreset() {
  document.getElementById('input-score').value = 92;
  document.getElementById('input-success').value = 98;
  document.getElementById('input-consec').value = 0;
  document.getElementById('input-amount').value = 380;
  document.getElementById('input-distance').value = 8;
  document.getElementById('input-age').value = 520;
  document.getElementById('input-category').value = 'Fashion';
  document.getElementById('input-courier').value = 'Shopee_Xpress';
  document.getElementById('input-window').checked = true;
  document.getElementById('input-phone').checked = true;
  document.getElementById('input-address').checked = false;

  updateLabInputs();
  runLiveScoring();
}

// =====================================================================
// 4. Dynamic Scoring Feedback Simulator (Slide 3)
// =====================================================================

async function handleDeliveryFeedback(eventOutcome) {
  const logEl = document.getElementById('sim-feedback-log');
  logEl.innerHTML = `<span style="color:var(--text-muted);">Transmitting outcome to Python feedback policy engine...</span>`;

  try {
    const res = await fetch('/api/orders/simulate-feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        current_score: appState.currentSimScore,
        current_consecutive_failed: appState.currentSimConsecFails,
        delivery_event: eventOutcome,
        reason: eventOutcome === 'DELIVERED' ? 'Package accepted by buyer at doorstep' : 'Buyer rejected parcel upon arrival (RTO)'
      })
    });

    if (!res.ok) throw new Error('Feedback transition failed');
    const data = await res.json();

    appState.currentSimScore = data.new_score;
    appState.currentSimConsecFails = data.new_consecutive_failures;

    // Update UI elements
    document.getElementById('sim-current-score').textContent = data.new_score.toFixed(1);
    document.getElementById('sim-consec-fails').textContent = data.new_consecutive_failures;
    
    const tierBadge = document.getElementById('sim-current-tier');
    tierBadge.className = `tier-badge ${data.badge_color}`;
    tierBadge.textContent = data.new_tier;

    // Render Event Log with timestamp
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
      <div style="font-size:0.78rem; color:var(--text-muted); padding:0.4rem 0.6rem; background:rgba(0,0,0,0.3); border-radius:4px;">
        Policy Directive: <span style="color:#fff;">${data.current_policy_action}</span>
      </div>
    `;

  } catch (err) {
    console.error('Error during feedback simulation:', err);
    logEl.innerHTML = `<span style="color:var(--rose);">Error communicating with feedback service.</span>`;
  }
}

// =====================================================================
// 5. Dataset Explorer
// =====================================================================

async function filterDataset(paymentMethod) {
  appState.currentDatasetFilter = paymentMethod;

  // Update button active styles
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
  tbody.innerHTML = `<tr><td colspan="10" style="text-align:center; padding:1.5rem; color:var(--text-muted);">Fetching dynamic batch from CSV...</td></tr>`;

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
// 6. Application Initialization
// =====================================================================

document.addEventListener('DOMContentLoaded', () => {
  // Check initial hash
  const initialHash = window.location.hash.replace('#', '') || 'overview';
  switchTab(initialHash);

  // Load initial backend telemetry
  loadEdaMetrics();
  loadModelSummary();
  runLiveScoring();
  filterDataset('ALL');
});
