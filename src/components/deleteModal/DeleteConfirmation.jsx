import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    IconButton,
    Typography,
    Box,
} from "@mui/material";
import styles from "./DeleteConfirmation.module.css";
import { Close } from "@mui/icons-material";

export default function DeleteConfirmationModal({
    open,
    onClose,
    onConfirm,
    bookTitle,
}) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            classes={{ paper: styles.dialogPaper }}
            maxWidth="xs"
            fullWidth
        >
            <DialogTitle className={styles.dialogTitle}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography>تأكيد الحذف</Typography>
                    <IconButton
                        onClick={onClose}
                        size="small"
                    >
                        <Close sx={{ 
                            color: "white" ,
                            "&:hover": {
                                color: "#f44336",
                                bgcolor:"white",
                                borderRadius: "50%",
                            },
                        }} />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent className={styles.dialogContent}>
                <p>هل أنت متأكد أنك تريد حذف "{bookTitle}"؟</p>
            </DialogContent>
            <DialogActions className={styles.dialogActions}>
                <Button
                    onClick={onConfirm}
                    variant="outlined"
                    sx={{
                        color: "#f44336",
                        borderColor: "#f44336",
                        "&:hover": {
                            backgroundColor: "#f44336",
                            color: "#fff",
                        },
                    }}
                    autoFocus
                >
                    حذف
                </Button>
            </DialogActions>
        </Dialog>
    );
}
