import json
import tempfile
import unittest
from pathlib import Path

from serve import annotations_response, write_annotations_payload


class AnnotationFileSyncTest(unittest.TestCase):
    def test_write_annotations_payload_creates_repo_notes_file(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            payload = {
                "annotations": [
                    {
                        "id": "ann-1",
                        "updatedAt": "2026-05-31T12:00:00.000Z",
                        "exact": "selected text",
                    }
                ]
            }

            result = write_annotations_payload(root, payload)

            self.assertEqual(result["count"], 1)
            out_path = root / "notes" / "annotations.json"
            self.assertTrue(out_path.exists())
            saved = json.loads(out_path.read_text(encoding="utf-8"))
            self.assertEqual(saved["schema"], "iktisat.annotations.v1")
            self.assertEqual(saved["annotations"][0]["id"], "ann-1")

    def test_annotations_response_reads_empty_file_when_missing(self):
        with tempfile.TemporaryDirectory() as tmp:
            response = annotations_response(Path(tmp))

            self.assertEqual(response["schema"], "iktisat.annotations.v1")
            self.assertEqual(response["annotations"], [])


if __name__ == "__main__":
    unittest.main()
