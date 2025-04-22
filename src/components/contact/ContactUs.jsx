import { useState } from 'react';
import { Input, Button, Typography, Box, Snackbar, Alert } from '@mui/material';
import styles from './ContactUs.module.css';
import contactImage from '../../assets/images/contact.png';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [showSuccess, setShowSuccess] = useState(false);

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validatePhone = (phone) => {
        if (!phone) return true;
        return /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(phone);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'الاسم مطلوب';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'البريد الإلكتروني مطلوب';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'البريد الإلكتروني غير صالح';
        }

        if (formData.phone && !validatePhone(formData.phone)) {
            newErrors.phone = 'رقم الهاتف غير صالح';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'الرسالة مطلوبة';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            console.log('Form submitted:', formData);
            setShowSuccess(true);
            setFormData({
                name: '',
                email: '',
                phone: '',
                message: ''
            });
        }
    };

    const handleCloseSnackbar = () => {
        setShowSuccess(false);
    };

    return (
        <div className={styles.contactContainer} id="contact-us">
            <Typography variant="h3" component="h1" className={styles.title}>
                📞 تواصل معنا
            </Typography>

            <Box className={styles.gridContainer}>
                <Box>
                    <img
                        src={contactImage}
                        alt="تواصل معنا"
                        className={styles.contactImage}
                    />
                </Box>

                <Box component="form" onSubmit={handleSubmit} className={styles.contactForm}>
                    <div className={styles.inputContainer}>
                        <label htmlFor="name" className={styles.inputLabel}>الاسم الكامل</label>
                        <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className={styles.inputField}
                            disableUnderline
                        />
                        {errors.name && <div className={styles.errorText}>{errors.name}</div>}
                    </div>

                    <div className={styles.inputContainer}>
                        <label htmlFor="email" className={styles.inputLabel}>البريد الإلكتروني</label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className={styles.inputField}
                            disableUnderline
                        />
                        {errors.email && <div className={styles.errorText}>{errors.email}</div>}
                    </div>

                    <div className={styles.inputContainer}>
                        <label htmlFor="phone" className={styles.inputLabel}>رقم الهاتف</label>
                        <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={styles.inputField}
                            disableUnderline
                            inputProps={{
                                style: {
                                    direction: 'ltr',
                                    textAlign: 'left'
                                }
                            }}
                        />
                        {errors.phone && <div className={styles.errorText}>{errors.phone}</div>}
                    </div>

                    <div className={styles.inputContainer}>
                        <label htmlFor="message" className={styles.inputLabel}>الرسالة</label>
                        <Input
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            className={`${styles.inputField} ${styles.textareaField}`}
                            disableUnderline
                            multiline
                        />
                        {errors.message && <div className={styles.errorText}>{errors.message}</div>}
                    </div>

                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        className={styles.submitButton}
                    >
                        إرسال الرسالة
                    </Button>
                </Box>
            </Box>

            <Snackbar
                open={showSuccess}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }} dir="rtl">
                    تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.
                </Alert>
            </Snackbar>
        </div>
    );
};

export default ContactUs;