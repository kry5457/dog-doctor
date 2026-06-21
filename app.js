// dog-doctor/app.js

// 1. Initial State
const state = {
  breed: null, // Selected breed object { id, name, size, brachy }
  ageUnit: "year", // "year" or "month"
  ageValue: 3,
  weight: null,
  selectedSymptoms: new Map(), // key: symptomId, value: { id, name, emoji, severity: 'medium', duration: 'today' }
  customSymptoms: [], // Array of strings
  activePart: "all"
};

// Map symptom IDs to parent body parts for easy lookup in algorithm and summary
const SYMPTOM_PARENT_MAP = {};
const SYMPTOM_EMOJI_MAP = {
  // Head
  eye_discharge: "👁️",
  eye_redness: "🔴",
  eye_cloudy: "⚪",
  runny_nose: "💧",
  coughing: "🗣️",
  ear_scratching: "👂",
  ear_smell: "👃",
  // Mouth
  vomiting: "🤮",
  diarrhea: "💩",
  bloody_stool: "🩸",
  loss_of_appetite: "🥣",
  drooling: "🤤",
  bad_breath: "💨",
  // Skin
  skin_scratching: "🧼",
  skin_redness: "🍂",
  dandruff: "❄️",
  hair_loss: "🩹",
  // Joints
  limping: "🦵",
  three_legs: "🐾",
  reluctance_to_move: "🥱",
  joint_licking: "👅",
  // Belly
  bloated_belly: "🎈",
  abdominal_pain: "⚡",
  prayer_pose: "🧘",
  // Body
  lethargy: "💤",
  fever: "🔥",
  panting: "🥵",
  excessive_thirst: "🥤",
  weight_loss: "📉"
};

// Initialize helper maps
Object.keys(BODY_PARTS).forEach(partKey => {
  BODY_PARTS[partKey].symptoms.forEach(sym => {
    SYMPTOM_PARENT_MAP[sym.id] = partKey;
  });
});

// 2. DOM Elements
const elements = {
  body: document.body,
  
  // Screens
  screenHome: document.getElementById("screen-home"),
  screenInfo: document.getElementById("screen-info"),
  screenSymptoms: document.getElementById("screen-symptoms"),
  screenSeverity: document.getElementById("screen-severity"),
  screenLoading: document.getElementById("screen-loading"),
  screenResult: document.getElementById("screen-result"),
  
  // Buttons
  btnStart: document.getElementById("btn-start"),
  btnToSymptoms: document.getElementById("btn-to-symptoms"),
  btnToSeverity: document.getElementById("btn-to-severity"),
  btnToDiagnosis: document.getElementById("btn-to-diagnosis"),
  btnRestart: document.getElementById("btn-restart"),
  btnBacks: document.querySelectorAll(".btn-back"),
  
  // Basic Info Form
  breedSearch: document.getElementById("breed-search"),
  btnClearBreed: document.getElementById("btn-clear-breed"),
  breedAutocompleteList: document.getElementById("breed-autocomplete-list"),
  selectedBreedId: document.getElementById("selected-breed-id"),
  toggleAgeYear: document.getElementById("toggle-age-year"),
  toggleAgeMonth: document.getElementById("toggle-age-month"),
  ageSlider: document.getElementById("age-slider"),
  ageMinLabel: document.getElementById("age-min-label"),
  ageMaxLabel: document.getElementById("age-max-label"),
  ageCurrentValue: document.getElementById("age-current-value"),
  ageGroupBadge: document.getElementById("age-group-badge"),
  weightInput: document.getElementById("weight-input"),
  weightGroupContainer: document.getElementById("weight-group-container"),
  weightGroupBadge: document.getElementById("weight-group-badge"),
  
  // Symptoms Screen
  dogSvg: document.getElementById("interactive-dog-svg"),
  currentPartName: document.getElementById("current-part-name"),
  tabButtons: document.querySelectorAll(".btn-tab"),
  symptomsGrid: document.getElementById("symptoms-grid"),
  customSymptomInput: document.getElementById("custom-symptom-input"),
  btnAddCustomSymptom: document.getElementById("btn-add-custom-symptom"),
  customSymptomsTags: document.getElementById("custom-symptoms-tags"),
  selectedSymptomsCount: document.getElementById("selected-symptoms-count"),
  
  // Severity Screen
  selectedSymptomsDetailList: document.getElementById("selected-symptoms-detail-list"),
  
  // Results Screen
  emergencyBanner: document.getElementById("emergency-banner"),
  urgencyBadge: document.getElementById("urgency-badge"),
  resultPetSummary: document.getElementById("result-pet-summary"),
  diseaseListContainer: document.getElementById("disease-list-container"),
  copingDoList: document.getElementById("coping-do-list"),
  copingDontList: document.getElementById("coping-dont-list"),
  vetSummaryText: document.getElementById("vet-summary-text"),
  btnCopyVetSummary: document.getElementById("btn-copy-vet-summary")
};

// 3. Navigation Functions (SPA Screen Swapping)
function navigateTo(screenId) {
  // Hide all screens
  [elements.screenHome, elements.screenInfo, elements.screenSymptoms, elements.screenSeverity, elements.screenLoading, elements.screenResult].forEach(scr => {
    scr.classList.remove("active");
  });
  
  // Show target screen
  const target = document.getElementById(screenId);
  if (target) {
    target.classList.add("active");
    target.scrollTop = 0;
  }
}

// 4. Initialize Core Listeners
function initApp() {


  // Home CTA
  elements.btnStart.addEventListener("click", () => {
    navigateTo("screen-info");
  });

  // Global Back Buttons
  elements.btnBacks.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-target");
      navigateTo(target);
    });
  });

  // Restart Button
  elements.btnRestart.addEventListener("click", () => {
    resetState();
    navigateTo("screen-home");
  });

  initBasicInfoScreen();
  initSymptomsScreen();
  initSeverityScreen();
}

// Reset State when starting over
function resetState() {
  state.breed = null;
  state.ageUnit = "year";
  state.ageValue = 3;
  state.weight = null;
  state.selectedSymptoms.clear();
  state.customSymptoms = [];
  state.activePart = "all";

  // Reset inputs
  elements.breedSearch.value = "";
  elements.selectedBreedId.value = "";
  elements.btnClearBreed.classList.add("hidden");
  elements.weightInput.value = "";
  elements.weightGroupContainer.classList.add("hidden");
  elements.customSymptomInput.value = "";
  elements.customSymptomsTags.innerHTML = "";
  
  // Reset Age Slider
  elements.toggleAgeYear.classList.add("active");
  elements.toggleAgeMonth.classList.remove("active");
  elements.ageSlider.min = "0";
  elements.ageSlider.max = "20";
  elements.ageSlider.value = "3";
  elements.ageMinLabel.innerText = "0세";
  elements.ageMaxLabel.innerText = "20세";
  elements.ageCurrentValue.innerText = "3세";
  updateAgeCategoryBadge();
  
  // Disable next button
  elements.btnToSymptoms.disabled = true;
  updateSelectedCountBadge();

  // Reset SVG highlights
  document.querySelectorAll(".silhouette-part").forEach(p => p.classList.remove("active"));
  elements.currentPartName.innerText = "전체";
  elements.tabButtons.forEach(btn => {
    if (btn.getAttribute("data-part") === "all") btn.classList.add("active");
    else btn.classList.remove("active");
  });
}

// 5. SCREEN 1: Basic Info Screen logic
function initBasicInfoScreen() {
  const input = elements.breedSearch;
  const list = elements.breedAutocompleteList;
  const clearBtn = elements.btnClearBreed;

  // Search autocomplete keyup
  input.addEventListener("input", () => {
    const val = input.value.trim();
    if (!val) {
      list.classList.add("hidden");
      clearBtn.classList.add("hidden");
      state.breed = null;
      checkInfoNextButton();
      return;
    }
    clearBtn.classList.remove("hidden");

    // Filter
    const filtered = BREEDS.filter(b => b.name.includes(val));
    renderAutocomplete(filtered);
  });

  clearBtn.addEventListener("click", () => {
    input.value = "";
    list.classList.add("hidden");
    clearBtn.classList.add("hidden");
    state.breed = null;
    checkInfoNextButton();
    input.focus();
  });

  // Hide autocomplete list when clicking outside
  document.addEventListener("click", (e) => {
    if (!elements.breedAutocompleteList.contains(e.target) && e.target !== input) {
      list.classList.add("hidden");
    }
  });

  // Age toggles
  elements.toggleAgeYear.addEventListener("click", () => {
    if (state.ageUnit === "month") {
      state.ageUnit = "year";
      elements.toggleAgeYear.classList.add("active");
      elements.toggleAgeMonth.classList.remove("active");
      elements.ageSlider.min = "0";
      elements.ageSlider.max = "20";
      elements.ageSlider.value = "3";
      elements.ageMinLabel.innerText = "0세";
      elements.ageMaxLabel.innerText = "20세";
      updateAgeSliderLabel();
    }
  });

  elements.toggleAgeMonth.addEventListener("click", () => {
    if (state.ageUnit === "year") {
      state.ageUnit = "month";
      elements.toggleAgeMonth.classList.add("active");
      elements.toggleAgeYear.classList.remove("active");
      elements.ageSlider.min = "1";
      elements.ageSlider.max = "12";
      elements.ageSlider.value = "6";
      elements.ageMinLabel.innerText = "1개월";
      elements.ageMaxLabel.innerText = "12개월";
      updateAgeSliderLabel();
    }
  });

  // Age slider update
  elements.ageSlider.addEventListener("input", () => {
    updateAgeSliderLabel();
  });

  // Weight input
  elements.weightInput.addEventListener("input", () => {
    const val = parseFloat(elements.weightInput.value);
    if (!isNaN(val) && val > 0) {
      state.weight = val;
      const category = getWeightCategory(val);
      elements.weightGroupBadge.innerText = category.text;
      elements.weightGroupBadge.className = `badge ${category.class}`;
      elements.weightGroupContainer.classList.remove("hidden");
    } else {
      state.weight = null;
      elements.weightGroupContainer.classList.add("hidden");
    }
  });

  // Move to symptoms button
  elements.btnToSymptoms.addEventListener("click", () => {
    renderSymptomsGrid();
    navigateTo("screen-symptoms");
  });
}

function renderAutocomplete(items) {
  const list = elements.breedAutocompleteList;
  list.innerHTML = "";
  
  if (items.length === 0) {
    const li = document.createElement("li");
    li.innerText = "일치하는 품종이 없습니다. (기타/믹스견으로 등록 가능)";
    li.style.color = "var(--text-muted)";
    li.style.cursor = "default";
    list.appendChild(li);
    list.classList.remove("hidden");
    return;
  }

  items.forEach(item => {
    const li = document.createElement("li");
    li.innerText = item.name;
    li.addEventListener("click", () => {
      elements.breedSearch.value = item.name;
      state.breed = item;
      list.classList.add("hidden");
      checkInfoNextButton();
    });
    list.appendChild(li);
  });
  list.classList.remove("hidden");
}

function updateAgeSliderLabel() {
  const val = parseInt(elements.ageSlider.value);
  state.ageValue = val;
  if (state.ageUnit === "year") {
    elements.ageCurrentValue.innerText = `${val}세`;
  } else {
    elements.ageCurrentValue.innerText = `${val}개월`;
  }
  updateAgeCategoryBadge();
}

function getAgeGroup() {
  if (state.ageUnit === "month") {
    return "puppy";
  } else {
    if (state.ageValue <= 1) return "puppy";
    if (state.ageValue <= 7) return "adult";
    return "senior";
  }
}

function updateAgeCategoryBadge() {
  const group = getAgeGroup();
  const badge = elements.ageGroupBadge;
  if (group === "puppy") {
    badge.innerText = "자견 (1세 이하 / 성장기)";
    badge.className = "badge badge-puppy";
  } else if (group === "adult") {
    badge.innerText = "성견 (1세 ~ 7세)";
    badge.className = "badge badge-adult";
  } else {
    badge.innerText = "노령견 (7세 이상)";
    badge.className = "badge badge-senior";
  }
}

function getWeightCategory(w) {
  if (w < 10) return { id: "small", text: "소형견 (<10kg)", class: "badge-puppy" };
  if (w <= 25) return { id: "medium", text: "중형견 (10~25kg)", class: "badge-adult" };
  return { id: "large", text: "대형견 (>25kg)", class: "badge-senior" };
}

function checkInfoNextButton() {
  if (state.breed) {
    elements.btnToSymptoms.disabled = false;
  } else {
    elements.btnToSymptoms.disabled = true;
  }
}

// 6. SCREEN 2: Symptoms selection screen logic
function initSymptomsScreen() {
  // 1. Tab buttons click event
  elements.tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const part = btn.getAttribute("data-part");
      selectBodyPart(part);
    });
  });

  // 2. Interactive SVG click event
  elements.dogSvg.addEventListener("click", (e) => {
    const partPath = e.target.closest(".silhouette-part");
    if (partPath) {
      const partId = partPath.id.replace("part-", "");
      selectBodyPart(partId);
    }
  });

  // 3. Custom symptom input
  elements.btnAddCustomSymptom.addEventListener("click", () => {
    addCustomSymptom();
  });

  elements.customSymptomInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addCustomSymptom();
    }
  });

  // 4. Move to details
  elements.btnToSeverity.addEventListener("click", () => {
    renderSeverityScreenList();
    navigateTo("screen-severity");
  });
}

function selectBodyPart(partId) {
  state.activePart = partId;
  
  // Update Tab buttons UI
  elements.tabButtons.forEach(btn => {
    if (btn.getAttribute("data-part") === partId) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  // Update SVG UI
  document.querySelectorAll(".silhouette-part").forEach(p => {
    const pId = p.id.replace("part-", "");
    if (pId === partId) {
      p.classList.add("active");
    } else {
      p.classList.remove("active");
    }
  });

  // Update part label text
  let label = "전체";
  if (partId !== "all" && BODY_PARTS[partId]) {
    label = BODY_PARTS[partId].name;
  }
  elements.currentPartName.innerText = label;

  renderSymptomsGrid();
}

function renderSymptomsGrid() {
  const grid = elements.symptomsGrid;
  grid.innerHTML = "";

  const renderCard = (sym) => {
    const isSelected = state.selectedSymptoms.has(sym.id);
    const emoji = SYMPTOM_EMOJI_MAP[sym.id] || "❓";

    const card = document.createElement("div");
    card.className = `symptom-card ${isSelected ? 'selected' : ''}`;
    card.innerHTML = `
      <div class="symptom-card-header">
        <span class="symptom-emoji">${emoji}</span>
        <span class="symptom-name">${sym.name}</span>
      </div>
      <p class="symptom-desc">${sym.desc}</p>
      <div class="card-checkbox"></div>
    `;

    card.addEventListener("click", () => {
      toggleSymptom(sym, emoji);
    });

    grid.appendChild(card);
  };

  if (state.activePart === "all") {
    // Show all symptoms
    Object.keys(BODY_PARTS).forEach(partKey => {
      BODY_PARTS[partKey].symptoms.forEach(sym => renderCard(sym));
    });
  } else {
    // Show filtered symptoms
    const targetPart = BODY_PARTS[state.activePart];
    if (targetPart) {
      targetPart.symptoms.forEach(sym => renderCard(sym));
    }
  }
}

function toggleSymptom(sym, emoji) {
  if (state.selectedSymptoms.has(sym.id)) {
    state.selectedSymptoms.delete(sym.id);
  } else {
    state.selectedSymptoms.set(sym.id, {
      id: sym.id,
      name: sym.name,
      emoji: emoji,
      severity: "medium", // default
      duration: "today" // default
    });
  }
  updateSelectedCountBadge();
  renderSymptomsGrid();
}

function addCustomSymptom() {
  const val = elements.customSymptomInput.value.trim();
  if (!val) return;

  if (state.customSymptoms.includes(val)) {
    showToast("이미 추가된 증상입니다.");
    return;
  }

  state.customSymptoms.push(val);
  elements.customSymptomInput.value = "";

  renderCustomSymptomTags();
  updateSelectedCountBadge();
}

function renderCustomSymptomTags() {
  const container = elements.customSymptomsTags;
  container.innerHTML = "";

  state.customSymptoms.forEach((symText, index) => {
    const tag = document.createElement("div");
    tag.className = "custom-tag";
    tag.innerHTML = `
      <span>📝 ${symText}</span>
      <button type="button" class="btn-remove-tag" data-index="${index}">×</button>
    `;

    tag.querySelector(".btn-remove-tag").addEventListener("click", () => {
      state.customSymptoms.splice(index, 1);
      renderCustomSymptomTags();
      updateSelectedCountBadge();
    });

    container.appendChild(tag);
  });
}

function updateSelectedCountBadge() {
  const count = state.selectedSymptoms.size + state.customSymptoms.length;
  elements.selectedSymptomsCount.innerText = count;

  if (count > 0) {
    elements.btnToSeverity.disabled = false;
  } else {
    elements.btnToSeverity.disabled = true;
  }
}

// 7. SCREEN 3: Symptom severity / duration screen logic
function initSeverityScreen() {
  elements.btnToDiagnosis.addEventListener("click", () => {
    navigateTo("screen-loading");
    
    // Simulate diagnosis loading
    setTimeout(() => {
      performDiagnosis();
      navigateTo("screen-result");
    }, 1800);
  });
}

function renderSeverityScreenList() {
  const container = elements.selectedSymptomsDetailList;
  container.innerHTML = "";

  if (state.selectedSymptoms.size === 0) {
    container.innerHTML = `<div class="no-disease-card">선택된 리스트형 증상이 없습니다. 직접 쓰신 기타 증상만 등록되었습니다.</div>`;
    return;
  }

  state.selectedSymptoms.forEach(sym => {
    const box = document.createElement("div");
    box.className = "detail-item-box";
    box.innerHTML = `
      <div class="detail-item-title-row">
        <span class="detail-item-emoji">${sym.emoji}</span>
        <span class="detail-item-name">${sym.name}</span>
      </div>
      
      <!-- Severity selection -->
      <div class="detail-option-group severity-group">
        <div class="detail-group-label">심각도</div>
        <div class="detail-buttons-row">
          <button type="button" class="btn-detail-choice ${sym.severity === 'light' ? 'active' : ''}" data-type="severity" data-val="light">경미함</button>
          <button type="button" class="btn-detail-choice ${sym.severity === 'medium' ? 'active' : ''}" data-type="severity" data-val="medium">보통</button>
          <button type="button" class="btn-detail-choice ${sym.severity === 'severe' ? 'active' : ''}" data-type="severity" data-val="severe">심각함</button>
        </div>
      </div>

      <!-- Duration selection -->
      <div class="detail-option-group">
        <div class="detail-group-label">지속 기간</div>
        <div class="detail-buttons-row">
          <button type="button" class="btn-detail-choice ${sym.duration === 'today' ? 'active' : ''}" data-type="duration" data-val="today">오늘 처음</button>
          <button type="button" class="btn-detail-choice ${sym.duration === 'few_days' ? 'active' : ''}" data-type="duration" data-val="few_days">2~3일</button>
          <button type="button" class="btn-detail-choice ${sym.duration === 'week_plus' ? 'active' : ''}" data-type="duration" data-val="week_plus">일주일 이상</button>
        </div>
      </div>
    `;

    // Add click listeners to choices
    box.querySelectorAll(".btn-detail-choice").forEach(btn => {
      btn.addEventListener("click", () => {
        const type = btn.getAttribute("data-type");
        const val = btn.getAttribute("data-val");

        // UI state toggle
        btn.parentNode.querySelectorAll(".btn-detail-choice").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        // Update state
        const storedSym = state.selectedSymptoms.get(sym.id);
        if (storedSym) {
          storedSym[type] = val;
          state.selectedSymptoms.set(sym.id, storedSym);
        }
      });
    });

    container.appendChild(box);
  });
}

// 8. DIAGNOSTIC ALGORITHM & SCREEN 4 RESULT BINDING
function performDiagnosis() {
  const ageGroup = getAgeGroup();
  const breedId = state.breed ? state.breed.id : "etc_mix";
  const weightVal = state.weight;
  
  // Calculate size category if weight entered
  let sizeCategory = state.breed ? state.breed.size : "medium";
  if (weightVal !== null) {
    if (weightVal < 10) sizeCategory = "small";
    else if (weightVal <= 25) sizeCategory = "medium";
    else sizeCategory = "large";
  }

  // Check if brachycephalic
  const isBrachy = state.breed ? state.breed.brachy : false;

  const matchedDiseases = [];

  DISEASES.forEach(disease => {
    let matchCount = 0;
    let baseScore = 0;
    
    // Evaluate matching symptoms
    disease.symptoms.forEach(symId => {
      if (state.selectedSymptoms.has(symId)) {
        matchCount++;
        const userSym = state.selectedSymptoms.get(symId);
        
        // Base weights
        let severityWeight = 1.0;
        if (userSym.severity === "medium") severityWeight = 1.4;
        if (userSym.severity === "severe") severityWeight = 2.0;

        let durationWeight = 1.0;
        if (userSym.duration === "few_days") durationWeight = 1.3;
        if (userSym.duration === "week_plus") durationWeight = 1.7;

        baseScore += (1.0 * severityWeight * durationWeight);
      }
    });

    if (matchCount > 0) {
      // Modifiers
      let ageMod = disease.ageModifiers[ageGroup] !== undefined ? disease.ageModifiers[ageGroup] : 1.0;
      let sizeMod = 1.0;
      if (disease.sizeModifiers && disease.sizeModifiers[sizeCategory] !== undefined) {
        sizeMod = disease.sizeModifiers[sizeCategory];
      }
      
      let breedMod = 1.0;
      if (disease.breedModifiers && disease.breedModifiers[breedId] !== undefined) {
        breedMod = disease.breedModifiers[breedId];
      }

      // Brachycephalic respiratory modifier
      let brachyMod = 1.0;
      if (isBrachy && (disease.id === "heatstroke" || disease.id === "tracheal_collapse")) {
        brachyMod = 1.6;
      }

      // Calculate final score
      const matchRatio = matchCount / disease.symptoms.length;
      const finalScore = baseScore * matchRatio * ageMod * sizeMod * breedMod * brachyMod;

      matchedDiseases.push({
        ...disease,
        matchCount: matchCount,
        score: finalScore
      });
    }
  });

  // Sort diseases by score descending
  matchedDiseases.sort((a, b) => b.score - a.score);

  // Take top 3
  const topDiseases = matchedDiseases.slice(0, 3);

  // Determine overall urgency
  let overallUrgency = "safe";
  let showRedBanner = false;

  if (topDiseases.length > 0) {
    // If any top matched disease has emergency urgency, overall urgency is emergency
    const hasEmergency = topDiseases.some(d => d.urgency === "emergency");
    const hasWarning = topDiseases.some(d => d.urgency === "warning");

    if (hasEmergency) {
      overallUrgency = "emergency";
      showRedBanner = true;
    } else if (hasWarning) {
      overallUrgency = "warning";
    }
  } else {
    // If no diseases matched but we have symptoms, determine by severity
    let hasSevereSymptom = false;
    state.selectedSymptoms.forEach(sym => {
      if (sym.severity === "severe") hasSevereSymptom = true;
    });

    if (hasSevereSymptom) {
      overallUrgency = "warning";
    }
  }

  // Render results
  renderResultsScreen(topDiseases, overallUrgency, showRedBanner, sizeCategory);
}

function renderResultsScreen(diseases, urgency, showRedBanner, sizeCategory) {
  // 1. Red Banner toggle
  if (showRedBanner) {
    elements.emergencyBanner.classList.remove("hidden");
  } else {
    elements.emergencyBanner.classList.add("hidden");
  }

  // 2. Urgency Badge UI
  let urgencyText = "안심 (홈케어 가능)";
  let urgencyClass = "badge-urgency-safe";
  if (urgency === "warning") {
    urgencyText = "주의 (내원 권장)";
    urgencyClass = "badge-urgency-warning";
  } else if (urgency === "emergency") {
    urgencyText = "긴급 (즉시 내원)";
    urgencyClass = "badge-urgency-emergency";
  }
  elements.urgencyBadge.innerText = urgencyText;
  elements.urgencyBadge.className = `badge ${urgencyClass}`;

  // 3. Pet summary card
  const breedName = state.breed ? state.breed.name : "기타/믹스견";
  const sizeText = sizeCategory === "small" ? "소형견" : (sizeCategory === "medium" ? "중형견" : "대형견");
  const ageGroupText = getAgeGroup() === "puppy" ? "자견" : (getAgeGroup() === "adult" ? "성견" : "노령견");
  const ageDisplay = state.ageUnit === "year" ? `${state.ageValue}세` : `${state.ageValue}개월`;
  const weightText = state.weight ? ` / ${state.weight}kg` : "";
  
  elements.resultPetSummary.innerText = `${breedName} / ${ageDisplay}(${ageGroupText}) / ${sizeText}${weightText}`;

  // 4. Disease cards render
  const container = elements.diseaseListContainer;
  container.innerHTML = "";

  if (diseases.length === 0) {
    container.innerHTML = `
      <div class="no-disease-card">
        입력하신 정보만으로는 매칭되는 특정 질병이 없습니다.<br>
        증상이 계속된다면 수의사의 정확한 검진을 받으시길 바랍니다.
      </div>
    `;
  } else {
    diseases.forEach(d => {
      const card = document.createElement("div");
      card.className = `disease-card level-${d.urgency}`;
      card.innerHTML = `
        <div class="disease-card-header">
          <h4 class="disease-card-title">${d.name}</h4>
          <span class="disease-match-badge">증상 <strong>${d.matchCount}개</strong> 일치</span>
        </div>
        <p class="disease-card-desc">${d.desc}</p>
      `;
      container.appendChild(card);
    });
  }

  // 5. Coping Actions (Do & Don't)
  const doList = elements.copingDoList;
  const dontList = elements.copingDontList;
  doList.innerHTML = "";
  dontList.innerHTML = "";

  // Extract Do's and Don'ts from the primary disease (first matched disease)
  let primaryDos = [
    { title: "조용하고 따뜻한 장소에서 안정을 취하게 하세요.", reason: "반려견이 신체 통증이나 이상을 겪을 때는 심리적인 안정이 회복 속도에 매우 중요합니다." },
    { title: "깨끗한 식수를 제공하세요.", reason: "체내 수분이 고갈되지 않도록 하되, 구토나 급체 시에는 수분 급여량을 극도로 소량씩 제한해야 합니다." }
  ];
  let primaryDonts = [
    { title: "사람용 약물은 절대로 주지 마세요.", reason: "타이레놀, 아스피린 등 사람약은 강아지에게 급성 간독성이나 적혈구 파괴 등 치명적인 부작용을 낳습니다." },
    { title: "과도한 놀이나 산책은 자제하세요.", reason: "심장, 췌장염 등 염증이나 기계적 손상 상태일 경우 활동이 급성 악화를 유도합니다." }
  ];

  if (diseases.length > 0) {
    const mainD = diseases[0];
    if (mainD.dos && mainD.dos.length > 0) primaryDos = mainD.dos;
    if (mainD.donts && mainD.donts.length > 0) primaryDonts = mainD.donts;
  }

  const renderCopingItem = (item, parentUl, isDo) => {
    const li = document.createElement("li");
    li.className = "coping-item";
    li.innerHTML = `
      <div class="coping-item-main">
        <span>${item.title}</span>
        <button class="btn-why" type="button">왜요? <span class="arrow">▼</span></button>
      </div>
      <div class="coping-item-detail">${item.reason}</div>
    `;

    // Accordion toggle
    const btnWhy = li.querySelector(".btn-why");
    const detailPanel = li.querySelector(".coping-item-detail");
    btnWhy.addEventListener("click", () => {
      detailPanel.classList.toggle("active");
      const isActive = detailPanel.classList.contains("active");
      btnWhy.innerHTML = isActive ? '닫기 <span class="arrow">▲</span>' : '왜요? <span class="arrow">▼</span>';
    });

    parentUl.appendChild(li);
  };

  primaryDos.forEach(item => renderCopingItem(item, doList, true));
  primaryDonts.forEach(item => renderCopingItem(item, dontList, false));

  // 6. Vet Summary text generation
  const summaryBox = elements.vetSummaryText;
  let summaryStr = `[닥터독 자가진단 증상 리포트]\n\n`;
  summaryStr += `■ 기본 정보\n`;
  summaryStr += `- 품종: ${breedName}\n`;
  summaryStr += `- 나이: ${ageDisplay} (${ageGroupText})\n`;
  summaryStr += `- 체형: ${sizeText}${state.weight ? ` (${state.weight}kg)` : ""}\n\n`;
  
  summaryStr += `■ 선택된 증상\n`;
  if (state.selectedSymptoms.size > 0) {
    state.selectedSymptoms.forEach(sym => {
      let sevText = sym.severity === "light" ? "경미함" : (sym.severity === "medium" ? "보통" : "심각함");
      let durText = sym.duration === "today" ? "오늘 처음" : (sym.duration === "few_days" ? "2~3일 지속" : "일주일 이상 지속");
      summaryStr += `* [${BODY_PARTS[SYMPTOM_PARENT_MAP[sym.id]].name}] ${sym.name} - 심각도: ${sevText} / 기간: ${durText}\n`;
    });
  } else {
    summaryStr += `(선택된 정형 증상 없음)\n`;
  }

  if (state.customSymptoms.length > 0) {
    summaryStr += `\n■ 기타 관찰된 증상 (보호자 직접 입력)\n`;
    state.customSymptoms.forEach(text => {
      summaryStr += `* ${text}\n`;
    });
  }

  if (diseases.length > 0) {
    summaryStr += `\n■ 예상 의심 질병 및 조언\n`;
    summaryStr += `- 의심 질병: ${diseases.map(d => d.name).join(", ")}\n`;
    summaryStr += `- 판정 긴급도: ${urgencyText}\n`;
  }
  
  summaryBox.value = summaryStr;

  // Copy trigger
  elements.btnCopyVetSummary.addEventListener("click", () => {
    copyToClipboard(summaryStr);
  });
}

function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      showToast("📋 증상 요약이 클립보드에 복사되었습니다!");
    }).catch(err => {
      fallbackCopyText(text);
    });
  } else {
    fallbackCopyText(text);
  }
}

function fallbackCopyText(text) {
  const textArea = elements.vetSummaryText;
  textArea.focus();
  textArea.select();
  try {
    document.execCommand("copy");
    showToast("📋 증상 요약이 클립보드에 복사되었습니다!");
  } catch (err) {
    showToast("❌ 복사에 실패했습니다. 텍스트 박스를 길게 눌러 복사해 주세요.");
  }
}

// 9. Toast utility
function showToast(message) {
  // Check if toast already exists
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    elements.appContainer.appendChild(toast);
  }
  toast.innerText = message;
  toast.classList.add("show");
  
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}

// Bootstrap
window.addEventListener("DOMContentLoaded", () => {
  initApp();
});
