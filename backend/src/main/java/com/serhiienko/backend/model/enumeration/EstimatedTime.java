package com.serhiienko.backend.model.enumeration;

public enum EstimatedTime {
    MIN_15(15),
    MIN_30(30),
    HOUR_1(60),
    HOUR_1_30(90),
    HOUR_2(120);

    private final long time;
    EstimatedTime(long time) {
        this.time = time;
    }

    public long getTime() {
        return time;
    }
}
