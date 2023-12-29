package com.serhiienko.backend.util;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class MailingUtil {
    private final JavaMailSender javaMailSender;

    public void sendVerify(String to, String code) {
        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(to);
        message.setSubject("SmileWorks: Verify");
        message.setText("Your verification code is: " + code);
        log.info("Message was sent to " + to);

        javaMailSender.send(message);
    }

    public void sendMessage(String to, String from, String msg){
        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(to);
        message.setSubject("SmileWorks: message from " + from);
        message.setReplyTo(from);
        message.setText(msg);
        log.info("Message was sent to " + to);

        javaMailSender.send(message);
    }
}
