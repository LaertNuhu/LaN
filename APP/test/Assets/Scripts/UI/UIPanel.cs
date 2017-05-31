using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class UIPanel : MonoBehaviour {

    public enum PANEL_NUMBERS : int { FAN_PANEL = 0, ARDUINO, LIGHT, HUMIDITY, HEAT, PROFILE, SETTINGS };



    public RectTransform coordinateBounds;
    protected int n;

    protected float width, height;
    public virtual void RefreshView() {

        width = coordinateBounds.rect.xMax - coordinateBounds.rect.xMin;
        height = coordinateBounds.rect.yMax - coordinateBounds.rect.yMin;

        n = MainInterface.Instance.data.state.Count;
    }

}
