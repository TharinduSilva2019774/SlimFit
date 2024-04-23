package com.example.slimfitbackend.controller;

import com.example.slimfitbackend.payload.MessageResponse;
import com.example.slimfitbackend.payload.SendMessageRequest;
import com.example.slimfitbackend.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/message")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @GetMapping("")
    public List<MessageResponse> getAllMessages() {
        return messageService.getAllMessageResponse();
    }

    @PostMapping("")
    public MessageResponse sendMessage(@RequestBody SendMessageRequest sendMessageRequest) throws Exception {
        return messageService.sendMessage(sendMessageRequest);
    }



}
