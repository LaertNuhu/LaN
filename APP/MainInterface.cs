using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MainInterface : MonoBehaviour {

    public Database data;

    

    public UIPanel[] panels;

    UIPanel activePanel;

    public static MainInterface Instance { get; private set; }
	void Awake () {
        if (Instance == null)
            Instance = this;
        else if (Instance != this)
            Destroy(gameObject);
        
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
    }
    
}
