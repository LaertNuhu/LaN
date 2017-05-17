using System.Collections;
using System.Collections.Generic;
using UnityEngine;


/**
    
    This class establishes a connection to the raspberry pi and verifies it. 

    After establishing a connection, you can request information about the system
    from the methods in this class

**/

public class NetworkHandler {


    string ip, user, password;

	public NetworkHandler(string ip)
    {
        this.ip = ip;

        if (!IpIsAvailable(ip))
            throw new RaspberryPiNotFound("The target IP did not respond with an expected protocol or doesn't exist.");
    }
    public bool Connect(string user, string password)
    {
        //TODO: Actually connect with the pi
        return true;
    }
    public bool IsConnected()
    {
        //TODO: Check if connected
        return true;
    }
    protected static bool IpIsAvailable(string ip)
    {
        //TODO: implement checker if ip is available and actually has the raspberry pi
        //connected to it.
        return true;
    }
    
}
