import styles from "./About.module.css";

export default function About() {
    return (
        <div className={styles.about}>
            <div className={styles.aboutContent}>
                <h1>
                    <i className="fa-solid fa-circle-info"></i> من نحن
                </h1>
                <h4>
                    "مشروعي كتبي" هو مساحة دافئة ومُلهمة لعرض الكتب التي لامست قلبي، وترك بصمة لكل قارئ بمكتبته المفضلة.
                    هنا، يمكن لأي شخص أن يُضيف كتاباً أحبه، بصورة جميلة، واسم الكاتب، ووصف بسيط يعكس إحساسه.
                    فكرة الموقع تنمو كل يوم، ومع الوقت سنضيف مزايا جديدة مثل التعديل، والبحث، لتصبح التجربة أكثر سلاسة ومتعة.
                </h4>

                <div className={styles.cards}>
                    <div className={styles.card}>
                        <h2>
                            <i className="fa-solid fa-pen-nib"></i> لماذا أنشأنا "مشروعي كتبي"؟
                        </h2>
                        <p>
                            لأن لكل قارئ قصة مع كتاب، ولكل كتاب مكانة خاصة في القلب.
                            أنشأنا هذا المشروع لنُخلّد ما نحب، ونشارك ما نؤمن به.
                        </p>
                    </div>

                    <div className={styles.card}>
                        <h2>
                            <i className="fa-solid fa-road"></i> رحلة القارئ تبدأ من هنا
                        </h2>
                        <p>
                            سواء كنتَ قارئًا نهمًا أو بدأت للتو، هنا يمكنك جمع كتبك المفضلة، وتشكيل مكتبتك الخاصة بكل حب.
                        </p>
                    </div>

                    <div className={styles.card}>
                        <h2>
                            <i className="fa-solid fa-bookmark"></i> نحفظ الذكريات على هيئة كتب
                        </h2>
                        <p>
                            كل كتاب قرأته هو أثر في روحك، و"مشروعي كتبي" يساعدك في توثيق تلك اللحظات الحميمية بينك وبين ما قرأت.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
