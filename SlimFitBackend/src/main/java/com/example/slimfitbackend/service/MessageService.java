package com.example.slimfitbackend.service;

import com.example.slimfitbackend.model.Message;
import com.example.slimfitbackend.model.User;
import com.example.slimfitbackend.payload.MessageResponse;
import com.example.slimfitbackend.payload.SendMessageRequest;
import com.example.slimfitbackend.payload.common.MapStructMapper;
import com.example.slimfitbackend.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private MapStructMapper mapStructMapper;

    @Autowired
    private UserService userService;

    public List<MessageResponse> getAllMessageResponse(){
        List<Message> message = messageRepository.findAll();
        List<MessageResponse> response = new ArrayList<>();
        for (Message message1 : message) {
            MessageResponse messageRes = mapStructMapper.messageToMessageResponse(message1);
            messageRes.setUsername(message1.getUser().getFirstName());
            response.add(messageRes);
        }
        return response;
    }

    public MessageResponse sendMessage(SendMessageRequest sendMessageRequest) throws Exception {
        User user = userService.getCurrentUser();
        Message message = new Message();
        message.setMessage(sendMessageRequest.getMessage());
        message.setUser(user);
        message.setDate(new Date());
        message = messageRepository.save(message);
        return mapStructMapper.messageToMessageResponse(message);
    }

}
