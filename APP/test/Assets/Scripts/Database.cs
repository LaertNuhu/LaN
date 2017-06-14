using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using LitJson;

/**
    
    This class contains every information about the physical system. New information is being retrieved
    periodically in a given interval.

    Already retrieved information is being stored and serialized/deserialized here. 
**/
public class Database {

    public List<State> state;
    NetworkHandler networkHandler;
    public Database(NetworkHandler networkHandler)
    {
        this.networkHandler = networkHandler;

        state = new List<State>();

        //TODO: Remove when time has come
        AutoFill();

    }

    /// <summary>
    /// This method automatically fills the List<State> list.
    /// </summary>
    void AutoFill()
    {
        System.Random r = new System.Random();

        for (int i = 0; i < 30; i++)
        {
            State s = new State();
            s.fanSpeed1 = (float)r.NextDouble() * 10 + 10;
            s.fanSpeed2 = (float)r.NextDouble() * 10 + 2;

            s.heat1 = (float)r.NextDouble() * 10 + 10;
            s.heat2 = (float)r.NextDouble() * 10 + 10;

            s.lightMeasurement1 = (float)r.NextDouble() * 10 + 10;
            s.lightMeasurement2 = (float)r.NextDouble() * 10 + 10;

            state.Add(s);
        }
            
    }
    public IEnumerator Refresh()
    {
        yield return networkHandler.Get();

        //Creates the data
        JsonData data = JsonMapper.ToObject(networkHandler.currentData);
        Debug.Log(data[0][0]);

        state.Clear();

        for(int i = 0; i < data.Count; i++)
        {
            State s = new State();
            s.humidity1 = ((int)data[i][3]);
            s.heat1 = ((int)data[i][4]);
            state.Add(s);
        }
    }
    //Load state from local file and deserialize
    public void LoadState()
    {

    }

    //Serialize state[] and save to file (binary ser., no encryption needed)
    public void SaveState()
    {

    }
    public struct State
    {
        /*
        Fill with information about the system
        */

        //FAN
        public float fanSpeed1;
        public float fanSpeed2;

        //to be continued....
        public float heat1;
        public float heat2;

        public float lightMeasurement1;
        public float lightMeasurement2;

        public float ledIntensity;

        public float humidity1;
        public float humidity2;

        public override string ToString()
        {
            return string.Format("FAN1: {0}\nFAN2: {1}", fanSpeed1, fanSpeed2);
        }
    }

    
}
