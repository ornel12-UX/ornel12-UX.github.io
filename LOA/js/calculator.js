// ============================================
// LOA Calculator - Advanced
// ============================================

// DOM Elements
const carPrice = document.getElementById('carPrice');
const carPriceRange = document.getElementById('carPriceRange');
const downPayment = document.getElementById('downPayment');
const downPaymentRange = document.getElementById('downPaymentRange');
const duration = document.getElementById('duration');
const durationRange = document.getElementById('durationRange');
const monthlyPayment = document.getElementById('monthlyPayment');
const residualValue = document.getElementById('residualValue');

// Interest rate (realistic French LOA rate)
const INTEREST_RATE = 0.0399; // 3.99% annual

// ============================================
// Sync Input and Range
// ============================================
function syncInputs(input, range) {
    input.addEventListener('input', (e) => {
        range.value = e.target.value;
        calculateLOA();
    });

    range.addEventListener('input', (e) => {
        input.value = e.target.value;
        calculateLOA();
    });
}

// ============================================
// Calculate LOA Payment
// ============================================
function calculateLOA() {
    const price = parseFloat(carPrice.value);
    const down = parseFloat(downPayment.value);
    const months = parseInt(duration.value);

    // Amount to finance
    const financeAmount = price - down;

    // Residual value (typically 30-50% depending on duration)
    let residualPercentage;
    if (months <= 24) {
        residualPercentage = 0.50;
    } else if (months <= 36) {
        residualPercentage = 0.40;
    } else if (months <= 48) {
        residualPercentage = 0.35;
    } else {
        residualPercentage = 0.30;
    }

    const residualAmount = price * residualPercentage;

    // Amount to pay monthly (excluding residual)
    const depreciationAmount = financeAmount - residualAmount;

    // Monthly interest rate
    const monthlyRate = INTEREST_RATE / 12;

    // Calculate payment using amortization formula
    // P = (r * A) / (1 - (1 + r)^(-n))
    // Where: P = payment, r = monthly rate, A = amount financed, n = number of payments

    let payment;
    if (monthlyRate === 0) {
        payment = depreciationAmount / months;
    } else {
        payment = (monthlyRate * depreciationAmount) / (1 - Math.pow(1 + monthlyRate, -months));
    }

    // Add insurance estimate (roughly 30-50€/month)
    const insurance = 40;
    const totalMonthly = payment + insurance;

    // Update display
    updateDisplay(totalMonthly, residualAmount);

    // Add animation
    animateValues();
}

// ============================================
// Update Display
// ============================================
function updateDisplay(payment, residual) {
    // Format with French locale
    const formattedPayment = Math.round(payment).toLocaleString('fr-FR');
    const formattedResidual = Math.round(residual).toLocaleString('fr-FR');

    monthlyPayment.textContent = `${formattedPayment} €`;
    residualValue.textContent = `${formattedResidual} €`;
}

// ============================================
// Animate Values
// ============================================
function animateValues() {
    const resultCard = document.querySelector('.calculator-result');

    if (resultCard) {
        resultCard.style.transform = 'scale(1.05)';
        setTimeout(() => {
            resultCard.style.transform = 'scale(1)';
        }, 200);
    }
}

// ============================================
// Format Input on Blur
// ============================================
function formatInputValue(input) {
    input.addEventListener('blur', (e) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value)) {
            e.target.value = value.toLocaleString('fr-FR');
        }
    });

    input.addEventListener('focus', (e) => {
        const value = e.target.value.replace(/\s/g, '');
        e.target.value = value;
    });
}

// ============================================
// Add Custom Styling to Ranges
// ============================================
function styleRangeSlider(slider) {
    const updateSliderBackground = () => {
        const min = slider.min || 0;
        const max = slider.max || 100;
        const value = slider.value;
        const percentage = ((value - min) / (max - min)) * 100;

        slider.style.background = `linear-gradient(to right, 
      #3E92CC 0%, 
      #0A2463 ${percentage}%, 
      #E2E8F0 ${percentage}%, 
      #E2E8F0 100%)`;
    };

    slider.addEventListener('input', updateSliderBackground);
    updateSliderBackground();
}

// ============================================
// Presets
// ============================================
function addPresets() {
    const presetButtons = `
    <div class="calculator-presets" style="display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap;">
      <button class="preset-btn" data-price="15000" data-down="1500" data-duration="36">Citadine</button>
      <button class="preset-btn" data-price="25000" data-down="2500" data-duration="36">Berline</button>
      <button class="preset-btn" data-price="35000" data-down="3500" data-duration="48">SUV</button>
      <button class="preset-btn" data-price="40000" data-down="4000" data-duration="48">Premium</button>
    </div>
  `;

    const calculatorForm = document.querySelector('.calculator-form');
    if (calculatorForm) {
        calculatorForm.insertAdjacentHTML('afterbegin', presetButtons);

        // Add preset button styles
        const style = document.createElement('style');
        style.textContent = `
      .preset-btn {
        padding: 8px 16px;
        border-radius: 20px;
        background: var(--color-gray-100);
        color: var(--color-gray-700);
        font-size: 14px;
        font-weight: 600;
        border: 2px solid transparent;
        cursor: pointer;
        transition: all 0.25s ease;
      }
      
      .preset-btn:hover {
        background: var(--color-secondary);
        color: white;
        transform: translateY(-2px);
      }
      
      .calculator-result {
        transition: transform 0.2s ease;
      }
    `;
        document.head.appendChild(style);

        // Add event listeners to presets
        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const price = btn.dataset.price;
                const down = btn.dataset.down;
                const dur = btn.dataset.duration;

                carPrice.value = price;
                carPriceRange.value = price;
                downPayment.value = down;
                downPaymentRange.value = down;
                duration.value = dur;
                durationRange.value = dur;

                calculateLOA();

                // Visual feedback
                btn.style.background = 'var(--color-success)';
                btn.style.color = 'white';
                setTimeout(() => {
                    btn.style.background = '';
                    btn.style.color = '';
                }, 300);
            });
        });
    }
}

// ============================================
// Initialize
// ============================================
function initCalculator() {
    if (!carPrice) return; // Exit if calculator not on page

    // Sync all inputs with ranges
    syncInputs(carPrice, carPriceRange);
    syncInputs(downPayment, downPaymentRange);
    syncInputs(duration, durationRange);

    // Format inputs
    formatInputValue(carPrice);
    formatInputValue(downPayment);

    // Style range sliders
    styleRangeSlider(carPriceRange);
    styleRangeSlider(downPaymentRange);
    styleRangeSlider(durationRange);

    // Add presets
    addPresets();

    // Initial calculation
    calculateLOA();

    console.log('✅ LOA Calculator initialized');
}

// ============================================
// Run on Load
// ============================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCalculator);
} else {
    initCalculator();
}

// ============================================
// Export for potential use in other pages
// ============================================
window.LOACalculator = {
    calculate: calculateLOA,
    init: initCalculator
};
