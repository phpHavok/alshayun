TARGET := qds.sif

$(TARGET): Singularity
	singularity build -F $@ $<

run: $(TARGET)
	singularity run -p $(TARGET)

daemon-start: $(TARGET)
	singularity instance start qds.sif qds

daemon-stop:
	singularity instance stop -F qds

clean:
	rm -f $(TARGET)

.PHONY: run daemon-start daemon-stop clean
