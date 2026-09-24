package com.hatirlabeni.authentication.exception;

import com.hatirlabeni.authentication.exception.admin.AlreadyAdminException;
import com.hatirlabeni.authentication.exception.admin.AlreadyUserException;
import com.hatirlabeni.authentication.exception.admin.RootIsImmutableException;
import com.hatirlabeni.authentication.exception.auth.InvalidCredentialsException;
import com.hatirlabeni.authentication.exception.auth.InvalidPasswordException;
import com.hatirlabeni.authentication.exception.mail.*;
import com.hatirlabeni.authentication.exception.user.UserAlreadyExistsException;
import com.hatirlabeni.authentication.exception.user.UserNotActiveException;
import com.hatirlabeni.authentication.exception.user.UserNotFoundException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // ==================================================
    // Validation
    // ==================================================

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ValidationErrorResponse> handleMethodArgumentNotValidException(
            final MethodArgumentNotValidException ex
    ) {
        Map<String, String> errors = new HashMap<>();

        for (FieldError fieldError : ex.getBindingResult().getFieldErrors()) {
            errors.put(
                    fieldError.getField(),
                    fieldError.getDefaultMessage()
            );
        }

        return ResponseEntity.badRequest().body(
                new ValidationErrorResponse(
                        LocalDateTime.now(),
                        HttpStatus.BAD_REQUEST.value(),
                        errors
                )
        );
    }

    // ==================================================
    // Authentication & Authorization
    // ==================================================

    @ExceptionHandler(InvalidCredentialsException.class)
    public ResponseEntity<ErrorResponse> handleInvalidCredentialsException(
            InvalidCredentialsException ex
    ) {
        return buildErrorResponse(
                HttpStatus.UNAUTHORIZED,
                ex.getMessage()
        );
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorResponse> handleAccessDeniedException(
            AccessDeniedException ex
    ) {
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        // Kimliği doğrulanmamış istekler 401, yetkisiz istekler 403 döner.
        if (authentication == null
                || authentication instanceof AnonymousAuthenticationToken) {

            return buildErrorResponse(
                    HttpStatus.UNAUTHORIZED,
                    "Kimlik doğrulaması gerekli."
            );
        }

        return buildErrorResponse(
                HttpStatus.FORBIDDEN,
                "Bu işlem için yetkiniz yok."
        );
    }

    @ExceptionHandler(InvalidPasswordException.class)
    public ResponseEntity<ErrorResponse> handleInvalidPasswordException(
            InvalidPasswordException ex
    ) {
        return buildErrorResponse(
                HttpStatus.BAD_REQUEST,
                ex.getMessage()
        );
    }

    // ==================================================
    // User
    // ==================================================

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ErrorResponse> handleDataIntegrityViolationException(
            DataIntegrityViolationException ex
    ) {
        return buildErrorResponse(
                HttpStatus.CONFLICT,
                "Kullanıcı bilgileri daha önce kayıtlı."
        );
    }

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<ErrorResponse> handleUserAlreadyExistsException(
            UserAlreadyExistsException ex
    ) {
        return buildErrorResponse(
                HttpStatus.CONFLICT,
                ex.getMessages()
        );
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleUserNotFoundException(
            UserNotFoundException ex
    ) {
        return buildErrorResponse(
                HttpStatus.NOT_FOUND,
                ex.getMessage()
        );
    }

    @ExceptionHandler(UserNotActiveException.class)
    public ResponseEntity<ErrorResponse> handleUserNotActiveException(
            UserNotActiveException ex
    ) {
        return buildErrorResponse(
                HttpStatus.FORBIDDEN,
                ex.getMessage()
        );
    }

    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<ErrorResponse> handleNoResourceFound(
            NoResourceFoundException ex
    ) {
        return buildErrorResponse(
                HttpStatus.NOT_FOUND,
                "İstenen endpoint bulunamadı."
        );
    }

    // ==================================================
    // Admin Management
    // ==================================================

    @ExceptionHandler(AlreadyAdminException.class)
    public ResponseEntity<ErrorResponse> handleAlreadyAdminException(
            AlreadyAdminException ex
    ) {
        return buildErrorResponse(
                HttpStatus.CONFLICT,
                ex.getMessage()
        );
    }

    @ExceptionHandler(AlreadyUserException.class)
    public ResponseEntity<ErrorResponse> handleAlreadyUserException(
            AlreadyUserException ex
    ) {
        return buildErrorResponse(
                HttpStatus.CONFLICT,
                ex.getMessage()
        );
    }

    @ExceptionHandler(RootIsImmutableException.class)
    public ResponseEntity<ErrorResponse> handleRootIsImmutableException(
            RootIsImmutableException ex
    ) {
        return buildErrorResponse(
                HttpStatus.FORBIDDEN,
                ex.getMessage()
        );
    }

    // ==================================================
    // Password Management
    // ==================================================

    @ExceptionHandler(InvalidPasswordResetTokenException.class)
    public ResponseEntity<ErrorResponse> handleInvalidPasswordResetTokenException(
            InvalidPasswordResetTokenException ex
    ) {
        // Mevcut davranış korunmuştur; HTTP status tutarsızlığı aşağıda belirtilmiştir.
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new ErrorResponse(
                        LocalDateTime.now(),
                        HttpStatus.FORBIDDEN.value(),
                        List.of(ex.getMessage())
                )
        );
    }

    @ExceptionHandler(ExpiredPasswordResetTokenException.class)
    public ResponseEntity<ErrorResponse> handleExpiredPasswordResetTokenException(
            ExpiredPasswordResetTokenException ex
    ) {
        // Mevcut davranış korunmuştur; HTTP status tutarsızlığı aşağıda belirtilmiştir.
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new ErrorResponse(
                        LocalDateTime.now(),
                        HttpStatus.FORBIDDEN.value(),
                        List.of(ex.getMessage())
                )
        );
    }

    // ==================================================
    // Email Management
    // ==================================================

    @ExceptionHandler(EmailAlreadyExistsException.class)
    public ResponseEntity<ErrorResponse> handleEmailAlreadyExistsException(
            EmailAlreadyExistsException ex
    ) {
        return buildErrorResponse(
                HttpStatus.CONFLICT,
                ex.getMessage()
        );
    }

    @ExceptionHandler(ChangeMailTokenNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleChangeMailTokenNotFoundException(
            ChangeMailTokenNotFoundException ex
    ) {
        return buildErrorResponse(
                HttpStatus.NOT_FOUND,
                ex.getMessage()
        );
    }

    @ExceptionHandler(MailActivationTokenNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleMailActivationTokenNotFoundException(
            MailActivationTokenNotFoundException ex
    ) {
        // Exception parametresi, handler ile eşleşecek şekilde düzeltilmiştir.
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new ErrorResponse(
                        LocalDateTime.now(),
                        HttpStatus.FORBIDDEN.value(),
                        List.of(ex.getMessage())
                )
        );
    }

    @ExceptionHandler(MailAlreadyActivatedException.class)
    public ResponseEntity<ErrorResponse> handleMailAlreadyActivatedException(
            MailAlreadyActivatedException ex
    ) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new ErrorResponse(
                        LocalDateTime.now(),
                        HttpStatus.FORBIDDEN.value(),
                        List.of(ex.getMessage())
                )
        );
    }

    // ==================================================
    // Generic Exception
    // ==================================================

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleException(
            Exception ex
    ) {
        System.out.println(ex.getMessage());

        return buildErrorResponse(
                HttpStatus.INTERNAL_SERVER_ERROR,
                "Beklenmeyen bir hata oluştu."
        );
    }

    // ==================================================
    // Private Helper Methods
    // ==================================================

    /**
     * Standart hata yanıtı oluşturur.
     */
    private ResponseEntity<ErrorResponse> buildErrorResponse(
            HttpStatus status,
            String message
    ) {
        return buildErrorResponse(status, List.of(message));
    }

    /**
     * Bir veya birden fazla hata mesajıyla standart yanıt oluşturur.
     */
    private ResponseEntity<ErrorResponse> buildErrorResponse(
            HttpStatus status,
            List<String> messages
    ) {
        return ResponseEntity.status(status).body(
                new ErrorResponse(
                        LocalDateTime.now(),
                        status.value(),
                        messages
                )
        );
    }
}