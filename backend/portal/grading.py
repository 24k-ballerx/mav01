from decimal import Decimal

# Simple grade mapping for WAEC/NECO style and GPA points
GRADE_SCALE = [
    (90, 'A', Decimal('4.0')),
    (80, 'B', Decimal('3.0')),
    (70, 'C', Decimal('2.0')),
    (60, 'D', Decimal('1.0')),
    (0,  'F', Decimal('0.0')),
]

def score_to_grade(score: Decimal):
    for threshold, grade, point in GRADE_SCALE:
        if score >= threshold:
            return {'grade': grade, 'point': point}
    return {'grade': 'F', 'point': Decimal('0.0')}

def calculate_gpa(results):
    """results: iterable of Result instances or dicts with 'score'"""
    total_points = Decimal('0.0')
    count = 0
    for r in results:
        score = Decimal(r.score)
        gp = score_to_grade(score)['point']
        total_points += gp
        count += 1
    if count == 0:
        return Decimal('0.0')
    return (total_points / Decimal(count)).quantize(Decimal('0.01'))
