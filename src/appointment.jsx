import React, { useState, useMemo, memo } from 'react';
import { Download, FileText } from 'lucide-react';

export default function AppointmentLetterForm() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    designation: '',
    type: 'Option 1',
    ctc: '',
    date: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const numberToWords = (num) => {
    const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

    const convertBelowThousand = (n) => {
        if (n < 10) return ones[n];
        if (n < 20) return teens[n - 10];
        let ten = Math.floor(n / 10);
        let one = n % 10;
        return tens[ten] + (one > 0 ? ' ' + ones[one] : '');
    };

    if (num === 0) return 'zero';

    let numStr = num.toString().replace(/,/g, '');
    let numInt = parseInt(numStr, 10);
    if (isNaN(numInt)) return '';

    let result = '';
    let crore = Math.floor(numInt / 10000000);
    let lakh = Math.floor((numInt % 10000000) / 100000);
    let thousand = Math.floor((numInt % 100000) / 1000);
    let hundred = Math.floor((numInt % 1000) / 100);
    let remainder = numInt % 100;

    if (crore > 0) result += convertBelowThousand(crore) + ' crore ';
    if (lakh > 0) result += convertBelowThousand(lakh) + ' lakh ';
    if (thousand > 0) result += convertBelowThousand(thousand) + ' thousand ';
    if (hundred > 0) result += ones[hundred] + ' hundred ';
    
    let remainderText = '';
    if (remainder > 0) {
        if (hundred > 0) remainderText += ' and ';
        if (remainder < 10) remainderText += ones[remainder];
        else if (remainder < 20) remainderText += teens[remainder - 10];
        else {
            let ten = Math.floor(remainder / 10);
            let one = remainder % 10;
            remainderText += tens[ten];
            if (one > 0) remainderText += ' ' + ones[one];
        }
    }
    result += remainderText;

    return result.trim().replace(/\s+/g, ' ').charAt(0).toUpperCase() + result.trim().slice(1) + ' Only';
  };

  const ctcInWords = useMemo(() => {
    if (!formData.ctc) return '';
    const numericCTC = parseInt(formData.ctc.toString().replace(/,/g, ''), 10);
    if (isNaN(numericCTC) || numericCTC <= 0) return '';
    return numberToWords(numericCTC);
  }, [formData.ctc]);

  const getLeavePolicy = () => {
    if (formData.type === 'Option 1') {
      return 'You will be eligible for paid leave after 6 months, 1 day casual leave per month from 7th Month onwards & 2 days per month (1 Casual & 1 Earned leave) from 13th Month as per company policy.';
    } else if (formData.type === 'Option 2') {
      return 'You will be eligible for 1 day of casual leave per month from the date of joining & 2 days per month (1 Casual & 1 Earned leave) from the 7th Month as per company policy.';
    }
    return '';
  };

  const getChennaiProfessionalTax = (monthlyGross) => {
    return 208;
  };

  const roundOff = (val) => {
    return Math.round(val);
  };

  const calculateCTCComponents = (annualCTC) => {
    const totalCTC = parseFloat(annualCTC);
    if (isNaN(totalCTC) || totalCTC <= 0) {
      return null;
    }

    const GrossAnnual = totalCTC;
    const BasicAnnual = GrossAnnual * 0.40;
    const BasicMonthly = BasicAnnual / 12;

    const HRA_Monthly = BasicMonthly * 0.50;
    const HRA_Annual = HRA_Monthly * 12;

    const Gratuity_Monthly = BasicMonthly * 0.0481;
    const Gratuity_Annual = Gratuity_Monthly * 12;

    const Conveyance_Annual = 19200;
    const Conveyance_Monthly = 1600;
    
    const MedicalAllowance_Monthly = totalCTC > 500000 ? 1250 : 0;
    const MedicalAllowance_Annual = MedicalAllowance_Monthly * 12;
    
    let M_G = totalCTC / 12; 
    let M_C_Calc = 0;
    let iteration = 0;
    const MAX_ITERATIONS = 10;
    const CONVERGENCE_THRESHOLD = 0.01;

    while (iteration < MAX_ITERATIONS) {
        const M_Basic = M_G * 0.40;
        const M_HRA = M_Basic * 0.50;

        const PF_Base_Monthly = M_G - M_HRA;
        let EmpContPF_Monthly = 0;
        let EmplrContPF_Monthly = 0;

        if (PF_Base_Monthly < 15000) {
            EmpContPF_Monthly = PF_Base_Monthly * 0.12;
            EmplrContPF_Monthly = PF_Base_Monthly * 0.12;
        } else {
            EmpContPF_Monthly = 1800;
            EmplrContPF_Monthly = 1800;
        }

        let EmpContESI_Monthly = 0;
        let EmplrContESI_Monthly = 0;
        if (M_G < 21001) {
            EmpContESI_Monthly = M_G * 0.0075;
            EmplrContESI_Monthly = M_G * 0.0325;
        }

        const Gratuity_Monthly_Calc = M_Basic * 0.0481;
        const StatBonus_Monthly_Calc = (M_G - M_HRA) * 0.0833; 

        const M_SpecialAllowance = M_G - M_Basic - M_HRA - Conveyance_Monthly - MedicalAllowance_Monthly - StatBonus_Monthly_Calc;

        M_C_Calc = M_G + EmplrContPF_Monthly + EmplrContESI_Monthly + Gratuity_Monthly_Calc;

        if (Math.abs(M_C_Calc - (totalCTC / 12)) < CONVERGENCE_THRESHOLD) {
            break;
        }

        M_G = M_G * ((totalCTC / 12) / M_C_Calc);
        iteration++;
    }

    const M_Basic = M_G * 0.40;
    const M_HRA = M_Basic * 0.50;
    
    const PF_Base_Monthly = M_G - M_HRA;
    let EmpContPF_Monthly = 0;
    let EmplrContPF_Monthly = 0;
    if (PF_Base_Monthly < 15000) {
        EmpContPF_Monthly = PF_Base_Monthly * 0.12;
        EmplrContPF_Monthly = PF_Base_Monthly * 0.12;
    } else {
        EmpContPF_Monthly = 1800;
        EmplrContPF_Monthly = 1800;
    }
    
    let EmpContESI_Monthly = 0;
    let EmplrContESI_Monthly = 0;
    if (M_G < 21001) {
        EmpContESI_Monthly = M_G * 0.0075;
        EmplrContESI_Monthly = M_G * 0.0325;
    }
    
    const Gratuity_Monthly_Calc = M_Basic * 0.0481;
    const StatBonus_Monthly_Calc = (M_G - M_HRA) * 0.0833;

    const M_Gross_Components_Sum = M_Basic + M_HRA + Conveyance_Monthly + MedicalAllowance_Monthly + StatBonus_Monthly_Calc;
    const M_SpecialAllowance = Math.max(0, M_G - M_Gross_Components_Sum);

    const M_Gross = M_Basic + M_HRA + Conveyance_Monthly + MedicalAllowance_Monthly + StatBonus_Monthly_Calc + M_SpecialAllowance;
    const M_CTC = M_Gross + EmplrContPF_Monthly + EmplrContESI_Monthly + Gratuity_Monthly_Calc;
    
    const M_ProfTax = getChennaiProfessionalTax(M_Gross);
    
    const M_NetSalary = M_Gross - EmpContPF_Monthly - EmpContESI_Monthly - M_ProfTax;
    
    return {
      M_Basic: roundOff(M_Basic),
      M_HRA: roundOff(M_HRA),
      M_Conveyance: roundOff(Conveyance_Monthly),
      M_MedicalAllowance: roundOff(MedicalAllowance_Monthly),
      M_StatutoryBonus: roundOff(StatBonus_Monthly_Calc),
      M_SpecialAllowance: roundOff(M_SpecialAllowance),
      M_Gross: roundOff(M_Gross),
      M_EmplrContPF: roundOff(EmplrContPF_Monthly),
      M_EmplrContESI: roundOff(EmplrContESI_Monthly),
      M_Gratuity: roundOff(Gratuity_Monthly_Calc),
      M_CTC: roundOff(M_CTC),
      M_EmpContPF: roundOff(EmpContPF_Monthly),
      M_EmpContESI: roundOff(EmpContESI_Monthly),
      M_ProfessionalTax: roundOff(M_ProfTax),
      M_NetSalary: roundOff(M_NetSalary),

      A_Basic: roundOff(M_Basic * 12),
      A_HRA: roundOff(M_HRA * 12),
      A_Conveyance: roundOff(Conveyance_Monthly * 12),
      A_MedicalAllowance: roundOff(MedicalAllowance_Monthly * 12),
      A_StatutoryBonus: roundOff(StatBonus_Monthly_Calc * 12),
      A_SpecialAllowance: roundOff(M_SpecialAllowance * 12),
      A_Gross: roundOff(M_Gross * 12),
      A_EmplrContPF: roundOff(EmplrContPF_Monthly * 12),
      A_EmplrContESI: roundOff(EmplrContESI_Monthly * 12),
      A_Gratuity: roundOff(Gratuity_Monthly_Calc * 12),
      A_CTC: roundOff(M_CTC * 12),
      A_EmpContPF: roundOff(EmpContPF_Monthly * 12),
      A_EmpContESI: roundOff(EmpContESI_Monthly * 12),
      A_ProfessionalTax: roundOff(M_ProfTax * 12),
      A_NetSalary: roundOff(M_NetSalary * 12)
    };
  };

  const ctcDetails = useMemo(() => {
    if (!formData.ctc) return null;
    const numericCTC = parseInt(formData.ctc.toString().replace(/,/g, ''), 10);
    if (isNaN(numericCTC) || numericCTC <= 0) return null;
    return calculateCTCComponents(numericCTC);
  }, [formData.ctc]);

  const renderAnnexureA = (details) => {
    if (!details) {
      return '<p style="text-align: center; margin-top: 50px;">Please enter a valid CTC amount to view Annexure - A.</p>';
    }
    
    const formatRupee = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(amount).replace('₹', '');
    };

    return `
      <div class="content">
        <div style="margin-bottom: 15px; font-size: 10pt;">
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 10px;">
            <tr>
              <td style="width: 60%; vertical-align: top; border: 2px solid #000; padding: 8px;">
                <div style="font-size: 9px; line-height: 1.4;">
                  <div style="font-weight: bold;">SBA INFO SOLUTIONS PVT LTD</div>
                  <div>#19, 46th STREET, ASHOK NAGAR,</div>
                  <div>CHENNAI – 600083</div>
                  <div style="margin-top: 6px;"><strong>Salary For Per Month Rs.${formData.ctc ? new Intl.NumberFormat('en-IN').format(Math.round(parseInt(formData.ctc.toString().replace(/,/g, ''), 10) / 12)) : '________'}/</strong></div>
                </div>
              </td>
              <td style="width: 40%; vertical-align: top; border: 2px solid #000; padding: 8px; border-left: none;">
                <div style="font-size: 9px; line-height: 1.4;">
                  <div style="font-weight: bold;">CASH/BANK</div>
                  <div style="font-weight: bold;">PAYEMENT/VOUCHER</div>
                  <div style="margin-top: 6px;">
                    <div><strong>No</strong></div>
                    <div style="margin-top: 4px;"><strong>Date</strong> ___________</div>
                  </div>
                </div>
              </td>
            </tr>
          </table>
          
          <div style="border: 2px solid #000; padding: 8px; margin-bottom: 10px; font-size: 10pt;">
            <div><strong>Paid To: -</strong> Mr. ${formData.name || '[Name]'} - ${formData.designation || '[Designation]'}</div>
          </div>
        </div>

        <table style="width: 100%; border-collapse: collapse; font-size: 10pt;">
          <thead>
            <tr style="background-color: #f2f2f2;">
              <th style="border: 1px solid #000; padding: 6px; text-align: left; width: 50%;">Salary Components</th>
              <th style="border: 1px solid #000; padding: 6px; text-align: right; width: 25%;">Per Month (Rs.)</th>
              <th style="border: 1px solid #000; padding: 6px; text-align: right; width: 25%;">Per Annum (Rs.)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid #000; padding: 6px; font-weight: bold;">Basic</td>
              <td style="border: 1px solid #000; padding: 6px; text-align: right;">${formatRupee(details.M_Basic)}</td>
              <td style="border: 1px solid #000; padding: 6px; text-align: right;">${formatRupee(details.A_Basic)}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #000; padding: 6px;">HRA</td>
              <td style="border: 1px solid #000; padding: 6px; text-align: right;">${formatRupee(details.M_HRA)}</td>
              <td style="border: 1px solid #000; padding: 6px; text-align: right;">${formatRupee(details.A_HRA)}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #000; padding: 6px;">Conveyance</td>
              <td style="border: 1px solid #000; padding: 6px; text-align: right;">${formatRupee(details.M_Conveyance)}</td>
              <td style="border: 1px solid #000; padding: 6px; text-align: right;">${formatRupee(details.A_Conveyance)}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #000; padding: 6px;">Medical Allowance</td>
              <td style="border: 1px solid #000; padding: 6px; text-align: right;">${formatRupee(details.M_MedicalAllowance)}</td>
              <td style="border: 1px solid #000; padding: 6px; text-align: right;">${formatRupee(details.A_MedicalAllowance)}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #000; padding: 6px;">Statutory Bonus</td>
              <td style="border: 1px solid #000; padding: 6px; text-align: right;">${formatRupee(details.M_StatutoryBonus)}</td>
              <td style="border: 1px solid #000; padding: 6px; text-align: right;">${formatRupee(details.A_StatutoryBonus)}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #000; padding: 6px;">ESI</td>
              <td style="border: 1px solid #000; padding: 6px; text-align: right;">${formatRupee(details.M_EmpContESI)}</td>
              <td style="border: 1px solid #000; padding: 6px; text-align: right;">${formatRupee(details.A_EmpContESI)}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #000; padding: 6px;">Special Allowance</td>
              <td style="border: 1px solid #000; padding: 6px; text-align: right;">${formatRupee(details.M_SpecialAllowance)}</td>
              <td style="border: 1px solid #000; padding: 6px; text-align: right;">${formatRupee(details.A_SpecialAllowance)}</td>
            </tr>
            <tr style="background-color: #e0e0e0; font-weight: bold;">
              <td style="border: 1px solid #000; padding: 6px;">Gross Salary</td>
              <td style="border: 1px solid #000; padding: 6px; text-align: right;">${formatRupee(details.M_Gross)}</td>
              <td style="border: 1px solid #000; padding: 6px; text-align: right;">${formatRupee(details.A_Gross)}</td>
            </tr>
            <tr style="background-color: #f2f2f2; font-weight: bold;">
              <td style="border: 1px solid #000; padding: 6px;">Employer Contribution Provident Fund</td>
              <td style="border: 1px solid #000; padding: 6px; text-align: right;">${formatRupee(details.M_EmplrContPF)}</td>
              <td style="border: 1px solid #000; padding: 6px; text-align: right;">${formatRupee(details.A_EmplrContPF)}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #000; padding: 6px;">Gratuity</td>
              <td style="border: 1px solid #000; padding: 6px; text-align: right;">${formatRupee(details.M_Gratuity)}</td>
              <td style="border: 1px solid #000; padding: 6px; text-align: right;">${formatRupee(details.A_Gratuity)}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #000; padding: 6px;">ESI</td>
              <td style="border: 1px solid #000; padding: 6px; text-align: right;">${formatRupee(details.M_EmplrContESI)}</td>
              <td style="border: 1px solid #000; padding: 6px; text-align: right;">${formatRupee(details.A_EmplrContESI)}</td>
            </tr>
            <tr style="background-color: #c0c0c0; font-weight: bold;">
              <td style="border: 1px solid #000; padding: 6px;">CTC</td>
              <td style="border: 1px solid #000; padding: 6px; text-align: right;">${formatRupee(details.M_CTC)}</td>
              <td style="border: 1px solid #000; padding: 6px; text-align: right;">${formatRupee(details.A_CTC)}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #000; padding: 6px;">Employee Contribution Provident Fund</td>
              <td style="border: 1px solid #000; padding: 6px; text-align: right;">${formatRupee(details.M_EmpContPF)}</td>
              <td style="border: 1px solid #000; padding: 6px; text-align: right;">${formatRupee(details.A_EmpContPF)}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #000; padding: 6px;">Professional Tax</td>
              <td style="border: 1px solid #000; padding: 6px; text-align: right;">${formatRupee(details.M_ProfessionalTax)}</td>
              <td style="border: 1px solid #000; padding: 6px; text-align: right;">${formatRupee(details.A_ProfessionalTax)}</td>
            </tr>
            <tr style="background-color: #e0e0e0; font-weight: bold;">
              <td style="border: 1px solid #000; padding: 6px;">Net Salary</td>
              <td style="border: 1px solid #000; padding: 6px; text-align: right;">${formatRupee(details.M_NetSalary)}</td>
              <td style="border: 1px solid #000; padding: 6px; text-align: right;">${formatRupee(details.A_NetSalary)}</td>
            </tr>
          </tbody>
        </table>

        <div style="margin-top: 15px; font-size: 9pt;">
          <p style="margin: 5px 0;"><strong>Benefits</strong></p>
          <p style="margin: 5px 0; margin-left: 15px;">1. Gratuity - As per the payment of Gratuity Act</p>
          <p style="margin: 5px 0; margin-left: 15px;">2. Mobile - As per the Company policy</p>
        </div>
      </div>
    `;
  };

  const downloadAsWord = () => {
    const letterHTML = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Appointment Letter</title>
  <style>
    @page { size: A4; margin: 0cm 1.5cm; }
    body { font-family: 'Times New Roman', serif; font-size: 12pt; line-height: 1.5; color: #000; margin: 0; padding: 0; }
    .page { page-break-after: always; min-height: 29.7cm; display: flex; flex-direction: column; }
    .page-one { page-break-after: always; min-height: 29.7cm; display: flex; flex-direction: column; }
  .letterhead { height: 70px; border-bottom: none; display: flex; align-items: center; justify-content: center; color: #999; font-size: 11px; }
  .page-one .letterhead, .page .letterhead { margin-top: 80px; }
  .footer { height: 70px; border-top: none; display: flex; align-items: center; justify-content: center; color: #999; font-size: 10px; margin-top: auto; }
    .content { flex: 1; padding: 20px 0; }
    .date-section { display: flex; justify-content: space-between; margin-bottom: 15px; }
    p { margin: 8px 0; text-align: justify; }
    .title { font-weight: bold; text-align: center; margin: 15px 0 10px 0; }
    .signature { margin-top: 50px; }
    strong { font-weight: bold; }
    table { border-collapse: collapse; }
    th, td { border: 1px solid #000; padding: 8px; }
    ul { margin: 10px 0 10px 20px; }
    li { margin: 5px 0; }
  </style>
</head>
<body>

<div class="page-one">
  <div class="letterhead"></div>
  
  <div class="content">
    <div class="date-section">
      <div>Dated – ${formData.date || '________________'}</div>
      <div>Private & Confidential</div>
    </div>
    
    <p><strong>To</strong><br>
    Mr. ${formData.name || '[Name]'}<br>
    ${formData.address || '[Address]'}</p>
    
    <div class="title">Sub: Letter of Appointment</div>
    
    <p>Dear Mr. ${formData.name || '[Name]'},</p>
    
    <p>We are pleased to appoint you to our organization as "<strong>${formData.designation || '[Designation]'}</strong>". Your consolidated CTC will be Rs. <strong>${formData.ctc || '________________'}</strong>/- per annum (Rupees <strong>${ctcInWords || '_____________'} Only Per Annum</strong>) (inclusive of PF / ESI/ Gratuity & Professional Tax) Refer to **Annexure - A** for the details of your compensation structure.</p>
    
    <p>Your offer has been made based on the information furnished by you. However, if there is a discrepancy or incorrect in the copies of documents/certificates with regard to your qualification, residential address, experience letters, and relieving letters, not only do we retain the right to review our offer of employment but initiate appropriate action against you.</p>
    
    <p><strong>Probation</strong> - You will be on probation for a period of one year from the above referenced date on which the appointment takes effect. The probation period is extendable or may be reduced at the sole discretion of the Management. Completion of probation does not warrant any salary revision.</p>
    
    <p><strong>Performance appraisal</strong> - A formal performance appraisal will be conducted at the 11th month from the date of joining. Salary revision is strictly based on the performance appraisal. Your increments/promotion and demotions will depend at the sole discretion of the management depending upon your efficiency, intelligence, regular attendance, sense of discipline, loyalty and good behavior and also subject to the prosperity of the organization.</p>
    
    <p><strong>Transfer/deputation</strong> - Though you have been engaged to a specific position, the company reserves the right to depute /transfer/assign to any of the company's current / or which may come into existence in future, branch offices in India/sister companies or associate companies. Your terms and conditions of employment will remain the same.</p>
    
    <p>During your employment with the company, you will be governed by the Company's policies and rules regarding leave, provident fund, ESI, Gratuity etc as applicable.</p>
  </div>
  
  <div class="footer"></div>
</div>

<div class="page">
  <div class="letterhead"></div>
  
  <div class="content">
    <p><strong>Leave</strong> - ${getLeavePolicy()}</p>
    
    <p>As mutually agreed during the interview we expect you to serve the organization for a minimum period of 3 years. However, we wish you continue to build and grow your career beyond 3+ years in SBA. You will be eligible for relieving order and experience certificate only upon completing one year of continuous service at SBA from the date of joining.</p>
    
    <p><strong>Notice period</strong> – In the event of your resigning from the services of the Company, you will be liable to serve a notice period of 3 months (90 days). It will be the discretion of the Management /your reporting Manager to decide whether you should work during the full notice period or whether your services shall terminate at an earlier date. If the HR / Management / RM decides & communicates to you that you have to serve the complete notice period and if you fail, the Management shall be at liberty to initiate appropriate disciplinary action against you.</p>
    
    <p>Your employment with us will be governed by the Terms & Conditions as detailed in **Annexure – B**.</p>
    
    <p>Please sign and return the duplicate copy of this letter as a token of your acceptance.</p>
    
    <p>We congratulate you on your appointment and wish you a long and successful career with SBA Info Solutions Pvt Ltd. We are confident that your contribution will take us further in our journey toward becoming market leaders in the areas that we focus. We assure you of our support for your professional development and growth.</p>
    
    <div class="signature">
      <p>Sincerely Yours<br>
      For SBA Info Solutions Pvt Ltd</p>
      <br><br>
      <p><strong>C.S.VijayaLakshmi</strong><br>
      Asst.Manager - HR&Admin.</p>
    </div>
  </div>
</div>

<div class="page">
  <div class="letterhead"></div>
  
  <div class="content">
    ${renderAnnexureA(ctcDetails)}
  </div>
</div>

</body>
</html>`;

    const blob = new Blob(['\ufeff', letterHTML], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Appointment_Letter_${(formData.name || 'Employee').replace(/\s+/g, '_')}.doc`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const downloadAsPDF = () => {
    const letterHTML = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Appointment Letter</title>
  <style>
    @page { size: A4; margin: 0cm 1.5cm; }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Times New Roman', serif; font-size: 12pt; line-height: 1.5; color: #000; }
    .page { page-break-after: always; min-height: 29.7cm; display: flex; flex-direction: column; }
    .page-one { page-break-after: always; min-height: 29.7cm; display: flex; flex-direction: column; }
  .letterhead { height: 70px; border-bottom: none; display: flex; align-items: center; justify-content: center; color: #999; font-size: 11px; }
  .page-one .letterhead, .page .letterhead { margin-top: 80px; }
  .footer { height: 70px; border-top: none; display: flex; align-items: center; justify-content: center; color: #999; font-size: 10px; margin-top: auto; }
    .content { flex: 1; padding: 20px 0; }
    .date-section { display: flex; justify-content: space-between; margin-bottom: 15px; }
    p { margin: 8px 0; text-align: justify; }
    .title { font-weight: bold; text-align: center; margin: 15px 0 10px 0; }
    .signature { margin-top: 50px; }
    strong { font-weight: bold; }
    table { border-collapse: collapse; width: 100%; }
    th, td { border: 1px solid #000; padding: 8px; text-align: left; }
    th { background-color: #f2f2f2; }
    ul { margin: 10px 0 10px 20px; }
    li { margin: 5px 0; }
    @media print { .page { page-break-after: always; } }
  </style>
</head>
<body>

<div class="page-one">
  <div class="letterhead"></div>
  
  <div class="content">
    <div class="date-section">
      <div>Dated – ${formData.date || '________________'}</div>
      <div>Private & Confidential</div>
    </div>
    
    <p><strong>To</strong><br>
    Mr. ${formData.name || '[Name]'}<br>
    ${formData.address || '[Address]'}</p>
    
    <div class="title">Sub: Letter of Appointment</div>
    
    <p>Dear Mr. ${formData.name || '[Name]'},</p>
    
    <p>We are pleased to appoint you to our organization as "<strong>${formData.designation || '[Designation]'}</strong>". Your consolidated CTC will be Rs. <strong>${formData.ctc || '________________'}</strong>/- per annum (Rupees <strong>${ctcInWords || '_____________'} Only Per Annum</strong>) (inclusive of PF / ESI/ Gratuity & Professional Tax) Refer to **Annexure - A** for the details of your compensation structure.</p>
    
    <p>Your offer has been made based on the information furnished by you. However, if there is a discrepancy or incorrect in the copies of documents/certificates with regard to your qualification, residential address, experience letters, and relieving letters, not only do we retain the right to review our offer of employment but initiate appropriate action against you.</p>
    
    <p><strong>Probation</strong> - You will be on probation for a period of one year from the above referenced date on which the appointment takes effect. The probation period is extendable or may be reduced at the sole discretion of the Management. Completion of probation does not warrant any salary revision.</p>
    
    <p><strong>Performance appraisal</strong> - A formal performance appraisal will be conducted at the 11th month from the date of joining. Salary revision is strictly based on the performance appraisal. Your increments/promotion and demotions will depend at the sole discretion of the management depending upon your efficiency, intelligence, regular attendance, sense of discipline, loyalty and good behavior and also subject to the prosperity of the organization.</p>
    
    <p><strong>Transfer/deputation</strong> - Though you have been engaged to a specific position, the company reserves the right to depute /transfer/assign to any of the company's current / or which may come into existence in future, branch offices in India/sister companies or associate companies. Your terms and conditions of employment will remain the same.</p>
    
    <p>During your employment with the company, you will be governed by the Company's policies and rules regarding leave, provident fund, ESI, Gratuity etc as applicable.</p>
  </div>
  
  <div class="footer"></div>
</div>

<div class="page">
  <div class="letterhead"></div>
  
  <div class="content">
    <p><strong>Leave</strong> - ${getLeavePolicy()}</p>
    
    <p>As mutually agreed during the interview we expect you to serve the organization for a minimum period of 3 years. However, we wish you continue to build and grow your career beyond 3+ years in SBA. You will be eligible for relieving order and experience certificate only upon completing one year of continuous service at SBA from the date of joining.</p>
    
    <p><strong>Notice period</strong> – In the event of your resigning from the services of the Company, you will be liable to serve a notice period of 3 months (90 days). It will be the discretion of the Management /your reporting Manager to decide whether you should work during the full notice period or whether your services shall terminate at an earlier date. If the HR / Management / RM decides & communicates to you that you have to serve the complete notice period and if you fail, the Management shall be at liberty to initiate appropriate disciplinary action against you.</p>
    
    <p>Your employment with us will be governed by the Terms & Conditions as detailed in **Annexure – B**.</p>
    
    <p>Please sign and return the duplicate copy of this letter as a token of your acceptance.</p>
    
    <p>We congratulate you on your appointment and wish you a long and successful career with SBA Info Solutions Pvt Ltd. We are confident that your contribution will take us further in our journey toward becoming market leaders in the areas that we focus. We assure you of our support for your professional development and growth.</p>
    
    <div class="signature">
      <p>Sincerely Yours<br>
      For SBA Info Solutions Pvt Ltd</p>
      <br><br>
      <p><strong>C.S.VijayaLakshmi</strong><br>
      Asst.Manager - HR&Admin.</p>
    </div>
  </div>
</div>

<div class="page">
  <div class="letterhead"></div>
  
  <div class="content">
    ${renderAnnexureA(ctcDetails)}
  </div>
</div>

</body>
</html>`;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(letterHTML);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  const styles = {
    container: { width: '100%', height: '100%', background: '#000000', padding: '20px', fontFamily: 'Arial, sans-serif', display: 'flex', flexDirection: 'column', overflow: 'auto' },
    mainCard: { maxWidth: '1200px', margin: '0 auto', width: '100%', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', overflow: 'visible', border: '2px solid #000', display: 'flex', flexDirection: 'column' },
    header: { background: '#000', padding: '30px 20px', color: '#fff', flexShrink: 0 },
    headerTitle: { display: 'flex', alignItems: 'center', gap: '12px', fontSize: '28px', fontWeight: 'bold', margin: '0 0 10px 0' },
    headerSubtitle: { fontSize: '14px', opacity: '0.9', margin: '0' },
    formSection: { padding: '30px 20px', backgroundColor: '#fff', flexShrink: 0 },
    formGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' },
    formGroup: { display: 'flex', flexDirection: 'column' },
    label: { fontSize: '14px', fontWeight: '600', color: '#000', marginBottom: '8px' },
    input: { padding: '12px 16px', fontSize: '14px', border: '2px solid #ccc', borderRadius: '8px', outline: 'none', backgroundColor: '#fff', color: '#000' },
    select: { padding: '12px 16px', fontSize: '14px', border: '2px solid #ccc', borderRadius: '8px', outline: 'none', backgroundColor: '#fff', color: '#000' },
    buttonContainer: { display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center', paddingTop: '20px', borderTop: '2px solid #000' },
    button: { display: 'flex', alignItems: 'center', gap: '8px', padding: '14px 28px', fontSize: '16px', fontWeight: '600', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.2)' },
    wordButton: { background: '#000' },
    pdfButton: { background: '#e7000b' },
    previewSection: { backgroundColor: '#f5f5f5', padding: '30px 20px', borderTop: '2px solid #000', flexGrow: 1, overflowY: 'auto' },
    previewTitle: { fontSize: '20px', fontWeight: 'bold', color: '#000', marginBottom: '15px', flexShrink: 0 },
    previewBox: { backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '2px solid #000', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', maxHeight: 'none', overflowY: 'auto', fontFamily: 'Times New Roman, serif', fontSize: '11pt', lineHeight: '1.5', minHeight: '400px' }
  };
  
  const PreviewAnnexureA = memo(() => {
    if (!ctcDetails) {
      return <p style={{textAlign: 'center', margin: '50px 0'}}>Enter a CTC to see the Annexure - A calculation.</p>;
    }
    
    return <div dangerouslySetInnerHTML={{ __html: renderAnnexureA(ctcDetails) }} style={{padding: '10px 0', borderTop: '1px dashed #ccc', marginTop: '20px'}} />;
  });

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .form-grid { grid-template-columns: 1fr; }
          .button-container { flex-direction: column; }
        }
        .preview-box::-webkit-scrollbar { width: 8px; }
        .preview-box::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 4px; }
        .preview-box::-webkit-scrollbar-thumb { background: #e7000b; border-radius: 4px; }
        .preview-box::-webkit-scrollbar-thumb:hover { background: #c00009; }
      `}</style>

      <div style={styles.container}>
        <div style={styles.mainCard}>
          <div style={styles.header}>
            <h1 style={styles.headerTitle}><FileText size={32} /> Appointment Letter Generator</h1>
          </div>

          <div style={styles.formSection}>
            <div style={styles.formGrid}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Employee Name *</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter employee name" style={styles.input} />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Date *</label>
                <input type="text" name="date" value={formData.date} onChange={handleChange} placeholder="DD-MM-YYYY" style={styles.input} />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Address</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Enter address" style={styles.input} />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Designation</label>
                <input type="text" name="designation" value={formData.designation} onChange={handleChange} placeholder="Enter designation" style={styles.input} />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Type *</label>
                <select name="type" value={formData.type} onChange={handleChange} style={styles.select}>
                  <option value="Option 1">Option 1 - Trainee Engineer</option>
                  <option value="Option 2">Option 2 - Technical Support Engineer</option>
                </select>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>CTC (Numbers) *</label>
                <input type="text" name="ctc" value={formData.ctc} onChange={handleChange} placeholder="e.g., 1,80,000" style={styles.input} />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>CTC (Auto-converted Words)</label>
                <input type="text" value={ctcInWords} placeholder="Words will auto-populate" style={{...styles.input, backgroundColor: '#f0f0f0', cursor: 'not-allowed'}} disabled />
              </div>
            </div>

            <div style={styles.buttonContainer}>
              <button onClick={downloadAsWord} style={{...styles.button, ...styles.wordButton}}>
                <Download size={20} /> Download as Word (3 Pages)
              </button>
              <button onClick={downloadAsPDF} style={{...styles.button, ...styles.pdfButton}}>
                <Download size={20} /> Download as PDF (3 Pages)
              </button>
            </div>
          </div>

          <div style={styles.previewSection}>
            <h2 style={styles.previewTitle}>Preview - Salary Calculation (Annexure - A)</h2>
            <div style={styles.previewBox}>
              <div style={{marginBottom: '40px', paddingBottom: '20px', borderBottom: '1px solid #ccc'}}>
                <p style={{fontWeight: 'bold', textAlign: 'center', margin: '15px 0'}}>**SALARY CALCULATION PREVIEW (ROUNDED OFF)**</p>
                <p style={{fontSize: '10pt', color: '#666', textAlign: 'center'}}>Professional Tax: Rs. 208/month (Fixed) | Medical Allowance: Rs. 1,250/month (if CTC &gt; 5,00,000)</p>
                <PreviewAnnexureA />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}