import Link from "next/link";
import { FaAddressBook } from "react-icons/fa";

import style from "../../public/styles/components/footer.component.module.css";

export default function () {
    return (
        <footer className={style.footer}>
            <section>
                <p>Quick Navigation</p>
                <Link href="/contact-data">
                    <span>
                        <FaAddressBook />
                        Contact
                    </span>
                </Link>
            </section>
            <section>
                <p>Important Links</p>
                {/* links such as tos, privacy policy, technolgy */}
            </section>
            <section>
                <p>Information</p>
                {/* links such as docs, contact info */}
            </section>
        </footer>
    );
}
