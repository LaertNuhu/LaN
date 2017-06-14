using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Movement : MonoBehaviour {

    public Transform rotor1, rotor2;
    public float speed;

	// Update is called once per frame
	void Update () {

        rotor1.eulerAngles += Vector3.forward * speed * Time.smoothDeltaTime;
	}
}
