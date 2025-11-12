import React, { useState } from 'react';
import { Download, Shield } from 'lucide-react';

export default function NDAFormGenerator() {
  const [formData, setFormData] = useState({
    Name: '',
    reportingTo: '',
    date: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Generate 3-page content with exact breaks
  const generateNDAContent = () => {
    const page1 = `Annexure – B

1. It is clearly understood that the above salary is for satisfactory discharge of all work and duties assigned to you – in writing or orally. In addition, depending on our customers & organizations reasonable needs and emergencies you may be called upon to work additional hours in order to fulfill responsibilities entrusted to you.

2. You will keep us informed of any change in your current residential address, your family status or any other relevant particulars. You would also let us know the name and address of your legal heir/nominee.

3. The company will expect you to work with a high standard of initiative, efficiency and economy at all times. During your employment with the company, you are required to deal with the Company's money, materials and documents with utmost honesty and professional ethics. If you are found guilty, at any point of time of moral turpitude or misappropriation regardless of the value involved, your services can be terminated notwithstanding other terms and conditions mentioned herein. In the event of breach, the management reserves the right to terminate without prejudice to any of its other legal remedies available for such breach.

4. You have been engaged on the presumption that the particulars furnished by you in your application and / or bio – data are correct. In the event the said particulars are found to be incorrect or it is found that you have concealed or withheld some other relevant facts, your appointment with the company can be terminated / cancelled without any notice.

Part B

In view of the highly competitive nature of the company's business and also in view of the fact that you would be in a position to obtain confidential information (as clarified below and outside of it that would affect the company's business) belonging to the Company, and being aware of the sensitivity of your position in the Company, you acknowledge that it is necessary to protect the commercial interest of the Company and prevent commercial exploitation of its Confidential Information. Therefore, you are willing to be bound by the following terms and conditions.

1. You acknowledge that the confidential information of the company whether stated as confidential or not by the company is the proprietary data of the company and when you are in the services of the company you shall maintain such confidential information confident and you shall not disclose in any form whether directly or indirectly such confidential information to any third party. Confidential information of the company includes but is not limited to customer information, trade secrets, databases, business processes, business plans, techniques, data of any kind, drawings, customer lists, financial statements, sales data, proprietary business information of any sort, research or development projects or results, tests and or any non-public information which concerns the business, operations, ideas or plans and other information.

2. You also hereby undertake that in the event of termination / resignation of your employment for whatever reason you shall not disclose or divulge, commercially exploit for your personal benefit or any entity apart from SBA INFO SOLUTIONS PVT LTD whether directly or indirectly the Confidential Information as mentioned above, belonging to the Company for a period of one year from the date of your disassociation from the Company.`;

    const page2 = `3. In the event of your resignation or termination by the company for whatever reason, you shall not induce / influence any employee of the COMPANY to leave the employment of the company or directly or indirectly hire or use the services of any employee of the company in any manner whatsoever for a period of one year from the date of such termination / resignation.

4. It shall be deemed a breach of this provision, if the employee, initiates the first contact with the client company or if such employee responds to an advertisement of employment opportunities of the client & if found true, your appointment with the company can be terminated / cancelled without any notice.

5. On termination, disassociation or resignation you shall not commence or undertake directly or indirectly whether full time or part time any commercial enterprise or activity which would be in the nature of competition to the business activities of the company for a period of one year from the date of your disassociation.

6. Your obligations and restrictions under this appointment letter would continue during the entire period of employment and for a period of one year thereafter.

7. In the event of breach of any terms and conditions of this appointment letter by you, the company reserves the right to seek such monitory damages as it may deem fit without prejudice to any of its legal rights under any applicable law.

8. You are required not to engage yourself in any other gainful or commercial employment, business or activity, part time or full time, directly, indirectly or simultaneously as long as you are employed with the company or engage yourself directly or indirectly in any other profitable business connected with the dealings or activities of the company in any way. Any action contrary to the above would render your services liable for termination. Notwithstanding the right to terminate, the management also reserves its right to claim such compensation as it may deem fit in the circumstances without prejudice to any of its legal rights under any applicable law.

9. Your services will be liable to be terminated at any time, without notice and without assigning any reason whatsoever and without compensation, if the management is not satisfied with your work or performance or in the event of dereliction of duty, irresponsibility, unauthorized and / or continued absence from work, negligence, disobedience, dishonesty and for any other valid or sufficient reason as the management deems fit. Notwithstanding the right to terminate, the management also reserves it right to claim such compensation as it may deem fit in the circumstances.

10. If you are employed through the services of a Placement Agency / Consultant, you are required to successfully serve in the company for a minimum period of 9 months from the date of appointment. In the event of discontinuation of service either voluntarily or by the company before the said period, the amount charged by the Placement Agency / consultant by way of professional charges towards the cost of recruitment, will be recovered from you.

11. You will be required to undergo various training programs / certifications etc, for skill enhancement / personal development during your services with the company. After the completion of the training program, it is required that you serve in the company for a minimum period of 12 months. In the event of your discontinuation of service either voluntarily or by the company before said period, training cost incurred during the said period will be recovered from you.`;

    const page3 = `12. Restraints

i. Access to information
Information is available on need to know basis for specific groups and the network file server of the company is segregated to allow individual sectors information access for projects and units. Access to this is authorized through access privileges approved by unit mentors or project mentors.

ii. Restriction on personal use
Use of company resources for personal use is strictly prohibited and not permitted. This includes usage of computer resources, information, internet service, Office working time and any other materials that belong to the company for any personal use.

13. Security
Security is an important aspect of our communication and office infrastructure. Communication security is maintained by controlling physical access to computer system, disabling all working stations, floppy disk drives and companywide awareness about the need for protection of intellectual property and sensitive customer information.

You will be reporting to: ${formData.reportingTo || '[Reporting Manager Name]'}

You are advised to go through the contents of this appointment and sign the duplicate copy, which is to be returned to us as a token of acceptance of the appointment and the terms and conditions stated therein.

jurisdiction: Employee consents to the exclusive jurisdiction and venue of the appropriate courts located in Chennai in any action arising out of or relating to this Agreement. Employee waives any other venue to which Employee might be entitled by domicile or otherwise.

Wishing you all the best
Yours faithfully,

For SBA Info Solutions Pvt Ltd



Authorized Signatory
I have read the Terms & Conditions of my appointment and have understood and accept the same.

Signature: 

Name: ${formData.Name || '[ Name]'}

Date: ${formData.date || '[Date]'}`;

    return { page1, page2, page3 };
  };

  const { page1, page2, page3 } = generateNDAContent();

  // Download as Word
  const downloadAsWord = () => {
    const header = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Annexure B - NDA</title>
  <style>
    @page { size: A4; margin: 1.5cm 1.8cm; }
    body { font-family: 'Times New Roman', serif; font-size: 12pt; line-height: 1.4; color: #000; }
    .page { page-break-after: always; min-height: 25cm; }
    p { margin: 6pt 0; text-align: justify; }
    .center { text-align: center; font-weight: bold; }
    .indent { margin-left: 20px; }
    .signature { margin-top: 80px; }
  </style>
</head>
<body>`;

    const content = `
<div class="page">
  <p class="center">Annexure – B</p>
  <br/>
  <p><strong>1.</strong> It is clearly understood that the above salary is for satisfactory discharge of all work and duties assigned to you – in writing or orally. In addition, depending on our customers & organizations reasonable needs and emergencies you may be called upon to work additional hours in order to fulfill responsibilities entrusted to you.</p>
  <p><strong>2.</strong> You will keep us informed of any change in your current residential address, your family status or any other relevant particulars. You would also let us know the name and address of your legal heir/nominee.</p>
  <p><strong>3.</strong> The company will expect you to work with a high standard of initiative, efficiency and economy at all times. During your employment with the company, you are required to deal with the Company's money, materials and documents with utmost honesty and professional ethics. If you are found guilty, at any point of time of moral turpitude or misappropriation regardless of the value involved, your services can be terminated notwithstanding other terms and conditions mentioned herein. In the event of breach, the management reserves the right to terminate without prejudice to any of its other legal remedies available for such breach.</p>
  <p><strong>4.</strong> You have been engaged on the presumption that the particulars furnished by you in your application and / or bio – data are correct. In the event the said particulars are found to be incorrect or it is found that you have concealed or withheld some other relevant facts, your appointment with the company can be terminated / cancelled without any notice.</p>
  <p><strong>Part B</strong></p>
  <p>In view of the highly competitive nature of the company's business and also in view of the fact that you would be in a position to obtain confidential information (as clarified below and outside of it that would affect the company's business) belonging to the Company, and being aware of the sensitivity of your position in the Company, you acknowledge that it is necessary to protect the commercial interest of the Company and prevent commercial exploitation of its Confidential Information. Therefore, you are willing to be bound by the following terms and conditions.</p>
  <p><strong>1.</strong> You acknowledge that the confidential information of the company whether stated as confidential or not by the company is the proprietary data of the company and when you are in the services of the company you shall maintain such confidential information confident and you shall not disclose in any form whether directly or indirectly such confidential information to any third party. Confidential information of the company includes but is not limited to customer information, trade secrets, databases, business processes, business plans, techniques, data of any kind, drawings, customer lists, financial statements, sales data, proprietary business information of any sort, research or development projects or results, tests and or any non-public information which concerns the business, operations, ideas or plans and other information.</p>
  <p><strong>2.</strong> You also hereby undertake that in the event of termination / resignation of your employment for whatever reason you shall not disclose or divulge, commercially exploit for your personal benefit or any entity apart from SBA INFO SOLUTIONS PVT LTD whether directly or indirectly the Confidential Information as mentioned above, belonging to the Company for a period of one year from the date of your disassociation from the Company.</p>
</div>

<div class="page">
  <p><strong>3.</strong> In the event of your resignation or termination by the company for whatever reason, you shall not induce / influence any employee of the COMPANY to leave the employment of the company or directly or indirectly hire or use the services of any employee of the company in any manner whatsoever for a period of one year from the date of such termination / resignation.</p>
  <p><strong>4.</strong> It shall be deemed a breach of this provision, if the employee, initiates the first contact with the client company or if such employee responds to an advertisement of employment opportunities of the client & if found true, your appointment with the company can be terminated / cancelled without any notice.</p>
  <p><strong>5.</strong> On termination, disassociation or resignation you shall not commence or undertake directly or indirectly whether full time or part time any commercial enterprise or activity which would be in the nature of competition to the business activities of the company for a period of one year from the date of your disassociation.</p>
  <p><strong>6.</strong> Your obligations and restrictions under this appointment letter would continue during the entire period of employment and for a period of one year thereafter.</p>
  <p><strong>7.</strong> In the event of breach of any terms and conditions of this appointment letter by you, the company reserves the right to seek such monitory damages as it may deem fit without prejudice to any of its legal rights under any applicable law.</p>
  <p><strong>8.</strong> You are required not to engage yourself in any other gainful or commercial employment, business or activity, part time or full time, directly, indirectly or simultaneously as long as you are employed with the company or engage yourself directly or indirectly in any other profitable business connected with the dealings or activities of the company in any way. Any action contrary to the above would render your services liable for termination. Notwithstanding the right to terminate, the management also reserves its right to claim such compensation as it may deem fit in the circumstances without prejudice to any of its legal rights under any applicable law.</p>
  <p><strong>9.</strong> Your services will be liable to be terminated at any time, without notice and without assigning any reason whatsoever and without compensation, if the management is not satisfied with your work or performance or in the event of dereliction of duty, irresponsibility, unauthorized and / or continued absence from work, negligence, disobedience, dishonesty and for any other valid or sufficient reason as the management deems fit. Notwithstanding the right to terminate, the management also reserves it right to claim such compensation as it may deem fit in the circumstances.</p>
  <p><strong>10.</strong> If you are employed through the services of a Placement Agency / Consultant, you are required to successfully serve in the company for a minimum period of 9 months from the date of appointment. In the event of discontinuation of service either voluntarily or by the company before the said period, the amount charged by the Placement Agency / consultant by way of professional charges towards the cost of recruitment, will be recovered from you.</p>
  <p><strong>11.</strong> You will be required to undergo various training programs / certifications etc, for skill enhancement / personal development during your services with the company. After the completion of the training program, it is required that you serve in the company for a minimum period of 12 months. In the event of your discontinuation of service either voluntarily or by the company before said period, training cost incurred during the said period will be recovered from you.</p>
</div>

<div class="page">
  <p><strong>12. Restraints</strong></p>
  <p class="indent"><strong>i. Access to information</strong><br>
  Information is available on need to know basis for specific groups and the network file server of the company is segregated to allow individual sectors information access for projects and units. Access to this is authorized through access privileges approved by unit mentors or project mentors.</p>
  <p class="indent"><strong>ii. Restriction on personal use</strong><br>
  Use of company resources for personal use is strictly prohibited and not permitted. This includes usage of computer resources, information, internet service, Office working time and any other materials that belong to the company for any personal use.</p>
  <p><strong>13. Security</strong><br>
  Security is an important aspect of our communication and office infrastructure. Communication security is maintained by controlling physical access to computer system, disabling all working stations, floppy disk drives and companywide awareness about the need for protection of intellectual property and sensitive customer information.</p>
  <p>You will be reporting to: <strong>${formData.reportingTo || '[Reporting Manager Name]'}</strong></p>
  <p>You are advised to go through the contents of this appointment and sign the duplicate copy, which is to be returned to us as a token of acceptance of the appointment and the terms and conditions stated therein.</p>
  <p><strong>jurisdiction:</strong> Employee consents to the exclusive jurisdiction and venue of the appropriate courts located in Chennai in any action arising out of or relating to this Agreement. Employee waives any other venue to which Employee might be entitled by domicile or otherwise.</p>
  <p>Wishing you all the best<br>
  Yours faithfully,</p>
  <p>For SBA Info Solutions Pvt Ltd</p>
  <div class="signature">
    <p>___________________________<br>
    <strong>Authorized Signatory</strong></p>
    <p style="margin-top: 60px;">
    I have read the Terms & Conditions of my appointment and have understood and accept the same.<br><br>
    Signature: ___________________________<br>
    Name: <strong>${formData.Name || '[ Name]'}</strong><br>
    Date: <strong>${formData.date || '[Date]'}</strong>
    </p>
  </div>
</div>`;

    const fullHTML = header + content + `</body></html>`;
    const blob = new Blob(['\ufeff', fullHTML], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `NDA_Annexure_B_${(formData.Name || 'Employee').replace(/\s+/g, '_')}.doc`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Download as PDF
  const downloadAsPDF = () => {
    const printWindow = window.open('', '_blank');
    const content = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Annexure B - NDA</title>
  <style>
    @page { size: A4; margin: 1.5cm 1.8cm; }
    body { font-family: 'Times New Roman', serif; font-size: 12pt; line-height: 1.4; color: #000; }
    .page { page-break-after: always; min-height: 25cm; }
    p { margin: 6pt 0; text-align: justify; }
    .center { text-align: center; font-weight: bold; }
    .indent { margin-left: 20px; }
    .signature { margin-top: 80px; }
  </style>
</head>
<body>
  <div class="page">
    <p class="center">Annexure – B</p>
    <br/>
    <p><strong>1.</strong> It is clearly understood that the above salary is for satisfactory discharge of all work and duties assigned to you – in writing or orally. In addition, depending on our customers & organizations reasonable needs and emergencies you may be called upon to work additional hours in order to fulfill responsibilities entrusted to you.</p>
    <p><strong>2.</strong> You will keep us informed of any change in your current residential address, your family status or any other relevant particulars. You would also let us know the name and address of your legal heir/nominee.</p>
    <p><strong>3.</strong> The company will expect you to work with a high standard of initiative, efficiency and economy at all times. During your employment with the company, you are required to deal with the Company's money, materials and documents with utmost honesty and professional ethics. If you are found guilty, at any point of time of moral turpitude or misappropriation regardless of the value involved, your services can be terminated notwithstanding other terms and conditions mentioned herein. In the event of breach, the management reserves the right to terminate without prejudice to any of its other legal remedies available for such breach.</p>
    <p><strong>4.</strong> You have been engaged on the presumption that the particulars furnished by you in your application and / or bio – data are correct. In the event the said particulars are found to be incorrect or it is found that you have concealed or withheld some other relevant facts, your appointment with the company can be terminated / cancelled without any notice.</p>
    <p><strong>Part B</strong></p>
    <p>In view of the highly competitive nature of the company's business and also in view of the fact that you would be in a position to obtain confidential information (as clarified below and outside of it that would affect the company's business) belonging to the Company, and being aware of the sensitivity of your position in the Company, you acknowledge that it is necessary to protect the commercial interest of the Company and prevent commercial exploitation of its Confidential Information. Therefore, you are willing to be bound by the following terms and conditions.</p>
    <p><strong>1.</strong> You acknowledge that the confidential information of the company whether stated as confidential or not by the company is the proprietary data of the company and when you are in the services of the company you shall maintain such confidential information confident and you shall not disclose in any form whether directly or indirectly such confidential information to any third party. Confidential information of the company includes but is not limited to customer information, trade secrets, databases, business processes, business plans, techniques, data of any kind, drawings, customer lists, financial statements, sales data, proprietary business information of any sort, research or development projects or results, tests and or any non-public information which concerns the business, operations, ideas or plans and other information.</p>
    <p><strong>2.</strong> You also hereby undertake that in the event of termination / resignation of your employment for whatever reason you shall not disclose or divulge, commercially exploit for your personal benefit or any entity apart from SBA INFO SOLUTIONS PVT LTD whether directly or indirectly the Confidential Information as mentioned above, belonging to the Company for a period of one year from the date of your disassociation from the Company.</p>
  </div>

  <div class="page">
    <p><strong>3.</strong> In the event of your resignation or termination by the company for whatever reason, you shall not induce / influence any employee of the COMPANY to leave the employment of the company or directly or indirectly hire or use the services of any employee of the company in any manner whatsoever for a period of one year from the date of such termination / resignation.</p>
    <p><strong>4.</strong> It shall be deemed a breach of this provision, if the employee, initiates the first contact with the client company or if such employee responds to an advertisement of employment opportunities of the client & if found true, your appointment with the company can be terminated / cancelled without any notice.</p>
    <p><strong>5.</strong> On termination, disassociation or resignation you shall not commence or undertake directly or indirectly whether full time or part time any commercial enterprise or activity which would be in the nature of competition to the business activities of the company for a period of one year from the date of your disassociation.</p>
    <p><strong>6.</strong> Your obligations and restrictions under this appointment letter would continue during the entire period of employment and for a period of one year thereafter.</p>
    <p><strong>7.</strong> In the event of breach of any terms and conditions of this appointment letter by you, the company reserves the right to seek such monitory damages as it may deem fit without prejudice to any of its legal rights under any applicable law.</p>
    <p><strong>8.</strong> You are required not to engage yourself in any other gainful or commercial employment, business or activity, part time or full time, directly, indirectly or simultaneously as long as you are employed with the company or engage yourself directly or indirectly in any other profitable business connected with the dealings or activities of the company in any way. Any action contrary to the above would render your services liable for termination. Notwithstanding the right to terminate, the management also reserves its right to claim such compensation as it may deem fit in the circumstances without prejudice to any of its legal rights under any applicable law.</p>
    <p><strong>9.</strong> Your services will be liable to be terminated at any time, without notice and without assigning any reason whatsoever and without compensation, if the management is not satisfied with your work or performance or in the event of dereliction of duty, irresponsibility, unauthorized and / or continued absence from work, negligence, disobedience, dishonesty and for any other valid or sufficient reason as the management deems fit. Notwithstanding the right to terminate, the management also reserves it right to claim such compensation as it may deem fit in the circumstances.</p>
    <p><strong>10.</strong> If you are employed through the services of a Placement Agency / Consultant, you are required to successfully serve in the company for a minimum period of 9 months from the date of appointment. In the event of discontinuation of service either voluntarily or by the company before the said period, the amount charged by the Placement Agency / consultant by way of professional charges towards the cost of recruitment, will be recovered from you.</p>
    <p><strong>11.</strong> You will be required to undergo various training programs / certifications etc, for skill enhancement / personal development during your services with the company. After the completion of the training program, it is required that you serve in the company for a minimum period of 12 months. In the event of your discontinuation of service either voluntarily or by the company before said period, training cost incurred during the said period will be recovered from you.</p>
  </div>

  <div class="page">
    <p><strong>12. Restraints</strong></p>
    <p class="indent"><strong>i. Access to information</strong><br>
    Information is available on need to know basis for specific groups and the network file server of the company is segregated to allow individual sectors information access for projects and units. Access to this is authorized through access privileges approved by unit mentors or project mentors.</p>
    <p class="indent"><strong>ii. Restriction on personal use</strong><br>
    Use of company resources for personal use is strictly prohibited and not permitted. This includes usage of computer resources, information, internet service, Office working time and any other materials that belong to the company for any personal use.</p>
    <p><strong>13. Security</strong><br>
    Security is an important aspect of our communication and office infrastructure. Communication security is maintained by controlling physical access to computer system, disabling all working stations, floppy disk drives and companywide awareness about the need for protection of intellectual property and sensitive customer information.</p>
    <p>You will be reporting to: <strong>${formData.reportingTo || '[Reporting Manager Name]'}</strong></p>
    <p>You are advised to go through the contents of this appointment and sign the duplicate copy, which is to be returned to us as a token of acceptance of the appointment and the terms and conditions stated therein.</p>
    <p><strong>jurisdiction:</strong> Employee consents to the exclusive jurisdiction and venue of the appropriate courts located in Chennai in any action arising out of or relating to this Agreement. Employee waives any other venue to which Employee might be entitled by domicile or otherwise.</p>
    <p>Wishing you all the best<br>
    Yours faithfully,</p>
    <p>For SBA Info Solutions Pvt Ltd</p>
    <div class="signature">
      <p>___________________________<br>
      <strong>Authorized Signatory</strong></p>
      <p style="margin-top: 60px;">
      I have read the Terms & Conditions of my appointment and have understood and accept the same.<br><br>
      Signature: ___________________________<br>
      Name: <strong>${formData.Name || '[ Name]'}</strong><br>
      Date: <strong>${formData.date || '[Date]'}</strong>
      </p>
    </div>
  </div>
</body>
</html>`;

    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  const styles = {
    container: { minHeight: '100vh', background: '#e7000b', padding: '20px', fontFamily: 'Arial, sans-serif' },
    mainCard: { maxWidth: '1200px', margin: '0 auto', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', overflow: 'hidden', border: '2px solid #000' },
    header: { background: '#000', padding: '30px 20px', color: '#fff' },
    headerTitle: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', fontSize: '28px', fontWeight: 'bold', margin: '0 0 10px 0' },
    headerSubtitle: { fontSize: '14px', opacity: '0.9', margin: '0', textAlign: 'center' },
    formSection: { padding: '30px 20px', backgroundColor: '#fff' },
    formGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '30px' },
    formGroup: { display: 'flex', flexDirection: 'column' },
    label: { fontSize: '14px', fontWeight: '600', color: '#000', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px' },
    required: { color: '#e7000b', fontSize: '16px' },
    input: { padding: '12px 16px', fontSize: '14px', border: '2px solid #ccc', borderRadius: '8px', outline: 'none', transition: 'border-color 0.3s', backgroundColor: '#fff', color: '#000' },
    buttonContainer: { display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center', paddingTop: '20px', borderTop: '2px solid #000' },
    button: { display: 'flex', alignItems: 'center', gap: '8px', padding: '14px 28px', fontSize: '16px', fontWeight: '600', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.3s', boxShadow: '0 4px 6px rgba(0,0,0,0.2)' },
    wordButton: { background: '#000' },
    pdfButton: { background: '#e7000b' },
    previewSection: { backgroundColor: '#f5f5f5', padding: '30px 20px', borderTop: '2px solid #000' },
    previewTitle: { fontSize: '20px', fontWeight: 'bold', color: '#000', marginBottom: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' },
    previewBox: { backgroundColor: '#fff', padding: '25px', borderRadius: '8px', border: '2px solid #000', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', maxHeight: '700px', overflowY: 'auto', fontFamily: 'Times New Roman, serif', fontSize: '12pt', lineHeight: '1.4', textAlign: 'center' },
    pageBreak: { pageBreakAfter: 'always', marginBottom: '20px' }
  };

  return (
    <>
      <style>{`
        @media (max-width: 768px) { .form-grid { grid-template-columns: 1fr; } .button-container { flex-direction: column; } }
        .preview-box::-webkit-scrollbar { width: 8px; }
        .preview-box::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 4px; }
        .preview-box::-webkit-scrollbar-thumb { background: #e7000b; border-radius: 4px; }
        .preview-box::-webkit-scrollbar-thumb:hover { background: #c00009; }
        .preview-content { text-align: left; }
      `}</style>

      <div style={styles.container}>
        <div style={styles.mainCard}>
          <div style={styles.header}>
            <h1 style={styles.headerTitle}><Shield size={32} /> NDA Agreement Generator</h1>
            <p style={styles.headerSubtitle}>Complete Non-Disclosure Agreement with Confidentiality Terms</p>
          </div>

          <div style={styles.formSection}>
            <div style={styles.formGrid}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Employee Name <span style={styles.required}>*</span></label>
                <input type="text" name="Name" value={formData.Name} onChange={handleChange} placeholder="Enter full name" style={styles.input} />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Reporting To</label>
                <input type="text" name="reportingTo" value={formData.reportingTo} onChange={handleChange} placeholder="Enter reporting manager name" style={styles.input} />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Date</label>
                <input type="text" name="date" value={formData.date} onChange={handleChange} placeholder="DD-MM-YYYY" style={styles.input} />
              </div>
            </div>

            <div style={styles.buttonContainer}>
              <button onClick={downloadAsWord} style={{...styles.button, ...styles.wordButton}}>
                <Download size={20} /> Download as Word
              </button>
              <button onClick={downloadAsPDF} style={{...styles.button, ...styles.pdfButton}}>
                <Download size={20} /> Download as PDF
              </button>
            </div>
          </div>

          <div style={styles.previewSection}>
            <h2 style={styles.previewTitle}><Shield size={24} /> Document Preview</h2>
            <div style={styles.previewBox}>
              <div style={{...styles.pageBreak, textAlign: 'left'}}>
                <pre style={{fontFamily: 'inherit', whiteSpace: 'pre-wrap', margin: 0}}>{page1}</pre>
              </div>
              <div style={{...styles.pageBreak, textAlign: 'left'}}>
                <pre style={{fontFamily: 'inherit', whiteSpace: 'pre-wrap', margin: 0}}>{page2}</pre>
              </div>
              <div style={{textAlign: 'left'}}>
                <pre style={{fontFamily: 'inherit', whiteSpace: 'pre-wrap', margin: 0}}>{page3}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}