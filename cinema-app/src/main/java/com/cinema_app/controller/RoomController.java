package com.cinema_app.controller;



import com.cinema_app.model.Offer;
import com.cinema_app.model.Room;
import com.cinema_app.service.OfferService;
import com.cinema_app.service.RoomService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rooms")
public class RoomController extends BasicControllerOperations<RoomService, Room>{

    public RoomController(RoomService service) {
        super(service);
        //TODO Auto-generated constructor stub
    }
    
}
