using System.Collections;
using System.Collections.Generic;
using UnityEngine.UI;
using UnityEngine;


public class Login : MonoBehaviour {

    [Header("Login-Specific")]
    [Space(10)]
    public InputField loginName;
    public InputField password;

    [Header("Other")]
    public CanvasGroup mainInterface;

    CameraMovement mov;
    CanvasGroup cg;
	void Start () {

        mainInterface.alpha = 0;

        //get cameramover
        mov = Camera.main.GetComponent<CameraMovement>();
        cg = GetComponent<CanvasGroup>();
        mov.Switch();
        
	}
	
    public void TryLogin()
    {
        /*
        if (string.IsNullOrEmpty(loginName.text) || string.IsNullOrEmpty(password.text))
            return;
            */
        
        //Actually connect with pi
        NetworkHandler net = new NetworkHandler("placeholderIP");

        if (!net.Connect(loginName.text, password.text))
            return;

        //Create database and assign it to the main interface so it can display its contents
        Database data = new Database(net);
        MainInterface.Instance.data = data;

        //Make screen invisible
        StartCoroutine(LerpBlur());
    }

    IEnumerator LerpBlur()
    {
        float timePassed = 0;

        while(timePassed < 0.5f)
        {
            timePassed += Time.deltaTime;
            cg.alpha = 1 - timePassed / 0.5f;
            mainInterface.alpha = timePassed / 0.5f;
            yield return null;
        }
        cg.alpha = 0;
        mainInterface.alpha = 1;
        GetComponent<Canvas>().enabled = false;
        
    }
}
