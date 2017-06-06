using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MainInterface : MonoBehaviour {

    public Database data;

    

    public UIPanel[] panels;
    IEnumerator checker;
    UIPanel activePanel;
    public static MainInterface Instance { get; private set; }
	void Awake () {

        if (Instance == null)
            Instance = this;
        else if (Instance != this)
            Destroy(gameObject);
        checker = PeriodicRefresh(5f);
        StartCoroutine(checker);
	}
    public void DisplayPanel(int i)
    {
        if (!(activePanel == null))
            activePanel.gameObject.SetActive(false);

        if (panels.Length <= i)
            return;
        panels[i].gameObject.SetActive(true);
        activePanel = panels[i];
        activePanel.RefreshView();

        if (i == 2)
            StopCoroutine(checker);
    }
    IEnumerator PeriodicRefresh(float wait)
    {
        float timePassed = 0;
        while (true)
        {
            timePassed += Time.deltaTime;
            if(timePassed > wait)
            {
                timePassed = 0;
                if(data != null)
                    StartCoroutine(data.Refresh());
            }
            yield return null;
        }
    }
}
