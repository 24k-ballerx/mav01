from io import BytesIO
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas

def export_result_pdf(result):
    buffer = BytesIO()
    p = canvas.Canvas(buffer, pagesize=A4)
    p.setFont('Helvetica-Bold', 16)
    p.drawString(72, 800, 'School Result')
    p.setFont('Helvetica', 12)
    p.drawString(72, 770, f'Student: {result.student.user.get_full_name()}')
    p.drawString(72, 750, f'Student ID: {result.student.student_id}')
    p.drawString(72, 730, f'Subject: {result.subject.name}')
    p.drawString(72, 710, f'Score: {result.score}')
    p.drawString(72, 690, f'Approved: {result.approved}')
    p.showPage()
    p.save()
    buffer.seek(0)
    return buffer
