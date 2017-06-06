using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CameraMovement : MonoBehaviour {

    public Transform around;
    [Header("Rotor")]
    [Space(10)]
    public Transform rotorObs;
    public Transform rotorTxt;
    [Header("Arduino")]
    [Space(10)]
    public Transform arduinoObs;
    public Transform arduinoTxt;

    public float speed;
    float t = 5.54009f;
    float i;
    float dist;
    bool constant = false;
    void Start()
    {
        i = transform.position.y;
        dist = (new Vector2(transform.position.x - around.position.x, transform.position.z - around.position.z)).magnitude;
    }

	// Update is called once per frame
	void Update () {
        if (Input.GetKeyDown(KeyCode.Escape))
            Application.Quit();
        if (Input.GetKey(KeyCode.Space) || constant)
        {
            Rotate();   
        }
	}

    public void Rotate()
    {
        transform.position = new Vector3(
            dist * Mathf.Cos(t) + around.position.x,
            i,
            dist * Mathf.Sin(t) + around.position.z);
        transform.rotation = Quaternion.LookRotation(-transform.position + around.position);
        t += Time.deltaTime * speed;
    }
    public void Switch()
    {
        rotorTxt.gameObject.SetActive(false);
        arduinoTxt.gameObject.SetActive(false);
        constant = !constant;
    }

    public void LerpRotor()
    {
        constant = false;
        arduinoTxt.gameObject.SetActive(false);
        StartCoroutine(LerpToTransform(rotorObs, 0.4f, rotorTxt.gameObject));
        
    }
    public void LerpArduino()
    {
        constant = false;
        rotorTxt.gameObject.SetActive(false);
        StartCoroutine(LerpToTransform(arduinoObs, 0.4f, arduinoTxt.gameObject));
        
    }
    IEnumerator LerpToTransform(Transform t, float time, GameObject g=null)
    {
        float timePassed = 0;
        Vector3 init = transform.position;

        Quaternion initAngle = transform.rotation;
        while(timePassed < time)
        {
            transform.position = Vector3.Lerp(init, t.position, timePassed / time);
            transform.rotation = Quaternion.Lerp(initAngle, t.rotation, timePassed / time);

            timePassed += Time.deltaTime;

            yield return null;
        }

        transform.position = t.position;
        transform.eulerAngles = t.eulerAngles;

        if(!constant && g!=null)
            g.SetActive(true);
    }
}
