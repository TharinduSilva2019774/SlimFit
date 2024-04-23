package com.example.slimfitbackend.service;

import com.example.slimfitbackend.model.User;
import com.example.slimfitbackend.payload.GetUserResponse;
import com.example.slimfitbackend.payload.SaveUserRequest;
import com.example.slimfitbackend.payload.common.MapStructMapper;
import com.example.slimfitbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private MapStructMapper mapStructMapper;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public boolean createNewUser(SaveUserRequest saveUserRequest) {

        try {
            Optional<User> optUser = userRepository.findByEmail(saveUserRequest.getEmail());

            if (optUser.isPresent()) {
                User user = optUser.get();
                user.setFirstName(saveUserRequest.getFirstName());
                user.setLastName(saveUserRequest.getLastName());
                user.setAge(saveUserRequest.getAge());
                user.setDateOfBirth(saveUserRequest.getDateOfBirth());
                user.setHeight(saveUserRequest.getHeight());
                user.setWeight(saveUserRequest.getWeight());
                user.setGender(saveUserRequest.getGender());

                //1 == male 2 == female
                if (user.getGender() == 1) {
                    user.setBmr(88.362 + (13.397 * user.getWeight()) + (4.799 * user.getHeight()) - (5.677 * user.getAge()));
                } else if (user.getGender() == 2) {
                    user.setBmr(447.593 + (9.247 * user.getWeight()) + (3.098 * user.getHeight()) - (4.330 * user.getAge()));
                }
                user.setWeeklyWeightLossGoal(saveUserRequest.getWeeklyWeightLossGoal());

                user.setDailyActivityGoal(saveUserRequest.getDailyActivityGoal());
                userRepository.save(user);
            }

            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public User getCurrentUser() throws Exception {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<User> optUser = userRepository.findByEmail(email);
        if (optUser.isPresent()){
            return optUser.get();
        } else {
            throw new Exception();
        }

    }

    public GetUserResponse getUser() throws Exception {
        return mapStructMapper.userToGetUserResponse(getCurrentUser());
    }

}


//    User user = optUser.get();
//                if(saveUserRequest.getFirstName() != null){
//                        user.setFirstName(saveUserRequest.getFirstName());
//                        }
//                        if(saveUserRequest.getLastName() != null){
//                        user.setLastName(saveUserRequest.getLastName());
//                        }
//                        if(saveUserRequest.getAge() != 0){
//                        user.setAge(saveUserRequest.getAge());
//                        }
//                        if(saveUserRequest.getDateOfBirth() != null){
//                        user.setDateOfBirth(saveUserRequest.getDateOfBirth());
//                        }
//                        if(saveUserRequest.getHeight() != 0){
//                        user.setHeight(saveUserRequest.getHeight());
//                        }
//                        if(saveUserRequest.getWeight() != 0){
//                        user.setWeight(saveUserRequest.getWeight());
//                        }
//                        if(saveUserRequest.getGender() != 0){
//                        user.setGender(saveUserRequest.getGender());
//
//                        //1 == male 2 == female
//                        if(user.getGender() == 1){
//                        user.setBmr(88.362 + (13.397 * user.getWeight()) + (4.799 * user.getHeight()) - (5.677 * user.getAge()));
//                        } else if (user.getGender() == 2){
//                        user.setBmr(447.593 + (9.247 * user.getWeight()) + (3.098 * user.getHeight()) - (4.330 * user.getAge()));
//                        }
//                        }
//                        if(saveUserRequest.getWeeklyWeightLossGoal() != 0){
//                        user.setWeeklyWeightLossGoal(saveUserRequest.getWeeklyWeightLossGoal());
//                        }
//
//                        user.setDailyActivityGoal(saveUserRequest.getDailyActivityGoal());
//                        userRepository.save(user);