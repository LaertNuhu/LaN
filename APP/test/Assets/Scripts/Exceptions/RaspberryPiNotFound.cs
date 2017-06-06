using System;
using System.Collections;
using System.Collections.Generic;

[Serializable()]
public class RaspberryPiNotFound : Exception {

    public RaspberryPiNotFound() : base() { }
    public RaspberryPiNotFound(string message) : base(message) { }
    public RaspberryPiNotFound(string message, System.Exception inner) : base(message, inner) { }
}
