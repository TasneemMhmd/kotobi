import styles from './About.module.css';
export default function About() {
return (
<div className={styles.about}>
    <div className={styles.aboutContent}>
        <h1><i className='fas faUserCircle '></i>من نحن</h1>
        <p>
            نحن مجموعة من المبرمجين والمصممين الذين يسعون لتقديم أفضل الحلول الرقمية
            لمستخدمي الإنترنت. نعمل على تطوير تطبيقات ومواقع إلكترونية مبتكرة تلبي
            احتياجات عملائنا.
        </p>
        <p>
            هدفنا هو توفير تجربة مستخدم سلسة وفعالة، مع التركيز على الجودة والابتكار.
            نحن هنا لمساعدتك في تحقيق أهدافك الرقمية.
        </p>
    </div>
    </div>
)
}
