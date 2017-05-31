using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI.Extensions;

public class LightPanel : UIPanel
{

    float maxValueY;
    public UILineRenderer rend1, rend2;

    public override void RefreshView()
    {
        base.RefreshView();

        rend1.Points = new Vector2[n];
        rend2.Points = new Vector2[n];

        maxValueY = 0;

        for (int i = 0; i < n; i++)
        {
            if (MainInterface.Instance.data.state[i].lightMeasurement1 > maxValueY)
                maxValueY = MainInterface.Instance.data.state[i].lightMeasurement1;

            if (MainInterface.Instance.data.state[i].lightMeasurement2 > maxValueY)
                maxValueY = MainInterface.Instance.data.state[i].lightMeasurement2;
        }

        maxValueY *= 2f;


        for (int i = 0; i < n; i++)
        {
            rend1.Points[i] = new Vector2((((float)i) / (n - 1)) * width, MainInterface.Instance.data.state[i].lightMeasurement1 * height * (1f / maxValueY));
            rend2.Points[i] = new Vector2((((float)i) / (n - 1)) * width, MainInterface.Instance.data.state[i].lightMeasurement2 * height * (1f / maxValueY));
        }
    }
}
