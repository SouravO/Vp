import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import groundBefore from "../../assets/img/gImage.jpg";
import groundAfter from "../../assets/img/ground.jpg";
import "./PreviewSection.css";

gsap.registerPlugin(ScrollTrigger);

const PreviewSection = () => {
  const containerRef = useRef(null);
  const [imgStatus, setImgStatus] = useState({ before: "idle", after: "idle" });

  useEffect(() => {
    console.log("PreviewSection mounted", { groundBefore, groundAfter });

    const ctx = gsap.context(() => {
      gsap.utils.toArray(".comparisonSection").forEach((section) => {
        const buildTimeline = () => {
          let tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "center center",
              end: () => "+=" + (section.offsetWidth || window.innerWidth),
              scrub: true,
              pin: true,
              anticipatePin: 1,
              // markers: true
            },
            defaults: { ease: "none" },
          });

          tl.fromTo(
            section.querySelector(".afterImage"),
            { xPercent: 100, x: 0 },
            { xPercent: 0 }
          ).fromTo(
            section.querySelector(".afterImage img"),
            { xPercent: -100, x: 0 },
            { xPercent: 0 },
            0
          );
        };

        const imgs = section.querySelectorAll("img");
        const unloaded = Array.from(imgs).filter((img) => !img.complete);

        if (unloaded.length) {
          let loadedCount = 0;
          const onLoaded = () => {
            loadedCount++;
            if (loadedCount === imgs.length) buildTimeline();
          };
          imgs.forEach((img) => {
            img.addEventListener("load", onLoaded, { once: true });
            img.addEventListener("error", onLoaded, { once: true });
          });
        } else {
          buildTimeline();
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="preview-section-root">
      <div className="preview-row" style={{ alignItems: "center" }}>
        {/* text div */}
        <div className="textPanel">
          <h2 className="preview-title">See The Transformation</h2>
          <p className="preview-desc">
            Witness the dramatic improvement our turf solutions can bring to any
            field. Scroll to compare before and after.
          </p>
        </div>

        {/* image div */}
        <div className="imageWrapper" style={{ backgroundColor: "red" }}>
          <section
            className="comparisonSection"
            style={{
              width: "100%",
              height: "80px", // fixed small rectangle height (use CSS instead if preferred)
              position: "relative",
              margin: "0 auto",
              overflow: "hidden",
            }}
          >
            <div className="comparisonImage beforeImage">
              <img
                src={groundBefore}
                alt="before"
                onLoad={() => {
                  setImgStatus((s) => ({ ...s, before: "loaded" }));
                  console.log("before image loaded", groundBefore);
                }}
                onError={(e) => {
                  setImgStatus((s) => ({ ...s, before: "error" }));
                  console.error("before image failed:", e.target.src);
                }}
              />
            </div>

            <div className="comparisonImage afterImage">
              <img
                src={groundAfter}
                alt="after"
                onLoad={() => {
                  setImgStatus((s) => ({ ...s, after: "loaded" }));
                  console.log("after image loaded", groundAfter);
                }}
                onError={(e) => {
                  setImgStatus((s) => ({ ...s, after: "error" }));
                  console.error("after image failed:", e.target.src);
                }}
              />
            </div>

            {/* fallback message if images failed */}
            {(imgStatus.before === "error" || imgStatus.after === "error") && (
              <div className="image-fallback">
                Image failed to load — check console/network
              </div>
            )}
          </section>
        </div>
      </div>
      <div>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt ad
        aut eligendi ducimus reiciendis, labore praesentium nam eos ea
        aspernatur. Beatae quaerat fugiat ea, temporibus eveniet excepturi
        libero optio harum ut, nemo enim iure hic reiciendis, quos non
        repellendus eius voluptatibus fuga rerum vitae voluptatem perspiciatis
        odio ullam quod? Assumenda vel vero corrupti, mollitia pariatur ipsa at
        maxime libero a corporis sapiente magnam impedit quidem doloribus saepe,
        nulla voluptatem ipsum deserunt recusandae sequi eos quis. Asperiores
        soluta officiis quos sapiente ex beatae illum repellendus, nulla
        dignissimos eos ducimus aliquid nostrum quaerat dolorum quibusdam quam,
        molestiae qui. Porro quia ea quibusdam modi quisquam. Ullam laborum
        labore commodi recusandae omnis exercitationem quas hic atque explicabo
        voluptatem odio, aut magni. Perferendis temporibus laborum laboriosam
        vero ea ducimus! Voluptatum error repudiandae velit expedita dolores rem
        voluptatibus animi dolor vero. Eos, nisi, sapiente expedita assumenda,
        dicta qui quis molestiae quo soluta incidunt debitis? Perferendis
        obcaecati ipsa quaerat consequatur sapiente at incidunt aliquam, harum
        commodi est sunt quidem ipsum praesentium nulla hic! Eius ipsum laborum
        exercitationem nisi ab quidem, eos odio nulla quia cum esse corporis,
        perspiciatis aspernatur a iste. Illo, ut commodi ad ratione rerum
        voluptatem quae temporibus quo nesciunt laboriosam natus quos
        necessitatibus perspiciatis. Nobis quam eaque blanditiis id mollitia,
        quibusdam deserunt rerum modi laboriosam nemo magni eius, aliquid quasi.
        Sint inventore, tempore corrupti veritatis animi repellat numquam nihil
        quam id deserunt, eaque culpa ratione iusto possimus recusandae incidunt
        quibusdam dignissimos soluta nam repudiandae. Reprehenderit libero
        magnam, voluptatum similique dolorum nam. Iste, incidunt temporibus iure
        perspiciatis quis sint. Sapiente neque dicta, asperiores quasi
        voluptate, nostrum nihil ullam iste blanditiis suscipit, nam ducimus.
        Temporibus tenetur aut ex velit quia accusantium, provident quod
        voluptatem cum nostrum necessitatibus incidunt quo et soluta qui, iste
        illo perspiciatis odit eveniet corrupti nesciunt nisi sed. Impedit
        necessitatibus quisquam nam sunt, veritatis commodi minima tempora
        alias. Nobis totam corrupti perferendis deleniti perspiciatis nihil
        harum consequuntur vitae illo magni ad excepturi eaque sit natus quae
        aut qui molestiae obcaecati, inventore dolore nostrum voluptatem amet
        eum hic! Commodi praesentium ut eum quae repellendus! Ducimus beatae at
        amet iste incidunt enim quas corrupti quibusdam eos ipsam molestiae quae
        id vel fugit, quisquam iusto. Autem fugiat enim nihil et omnis ea
        deleniti veritatis quaerat, asperiores accusantium architecto quod
        aperiam repellendus mollitia, delectus dignissimos officia consectetur
        expedita alias voluptatibus voluptatem recusandae laborum! Minima quam
        cumque debitis similique iure consequuntur quae, quasi dolore. Voluptas,
        velit. Praesentium earum itaque, sed quasi harum quos, architecto totam
        distinctio magni, pariatur maiores illo esse. Magni temporibus voluptas,
        unde velit sit maiores soluta, in quam excepturi doloribus beatae!
        Similique nam sapiente corrupti laborum sequi asperiores deserunt, animi
        odit amet cupiditate! Quisquam omnis cumque in tenetur mollitia
        temporibus eveniet ab deserunt qui odio obcaecati harum soluta officia
        impedit, quidem iusto, iste fugit eum quas vero accusamus eligendi!
        Sequi, sint? Ex sit deleniti eum quo, quaerat, fugit ipsum eligendi
        magni aspernatur odit voluptate quae beatae corporis iste sint corrupti
        nisi saepe rerum? Accusamus distinctio quis aperiam voluptate cumque
        cupiditate eligendi impedit laudantium nesciunt suscipit explicabo
        provident quam praesentium accusantium debitis, adipisci laborum
        facilis, commodi voluptatibus neque quos. Expedita, quas. Laudantium
        eveniet iste id atque. Similique minus beatae molestiae, eius quibusdam
        suscipit consectetur voluptatem veniam harum sequi. Debitis similique
        asperiores ex consequatur nesciunt, alias sed laboriosam magnam optio
        est? Vel maiores recusandae est nemo. Asperiores quae illo similique
        modi soluta. Earum similique dolor ad aliquam numquam nam facilis? Amet
        nobis, possimus consequuntur dolor explicabo quod hic atque tenetur
        libero voluptatibus commodi, dolorum iusto inventore assumenda ratione,
        nam voluptatum repudiandae minima debitis illum illo laborum culpa esse
        suscipit! Qui nobis libero optio laboriosam dolore corporis ratione
        cupiditate, doloremque sint odit nesciunt eaque quidem dolorem
        asperiores recusandae culpa quia id amet aliquam, quas fugit laudantium.
        Eaque doloribus obcaecati minima asperiores voluptate ea eligendi?
        Expedita itaque officia accusantium deserunt alias deleniti! Eum hic
        nulla suscipit doloremque totam assumenda quis, possimus maxime eos
        obcaecati veniam eaque repellendus natus architecto? Illo modi fuga est
        doloribus fugiat, ab neque ad vitae perferendis aperiam iusto eum iste
        esse reprehenderit, quisquam magni eaque laboriosam, distinctio
        voluptates placeat voluptatem a. Quos velit praesentium sed ratione
        corporis eos cum atque, sequi amet quia iusto suscipit magnam molestias
        quo eligendi doloribus. Ullam neque modi quae vero natus magnam
        dignissimos temporibus nam ex, ipsam alias autem assumenda
        exercitationem excepturi? Quibusdam, voluptates quae, accusamus dolores
        sunt similique perspiciatis dolor beatae obcaecati dolorem earum,
        molestias quasi quo voluptatum aperiam illo quos quam aspernatur numquam
        sit veniam ratione magnam? Et, reprehenderit nemo, in iste rem eligendi,
        ex ad facilis nisi consequuntur iure eos quas officiis ea animi
        voluptates. Corporis eligendi sed voluptas consectetur reiciendis
        dolorem voluptates doloribus corrupti laudantium dolorum totam magni
        natus minima iusto laborum soluta nulla itaque quam sunt, cupiditate
        adipisci dolore ex nisi repellat. Fugiat, repellendus? Unde
        reprehenderit totam aut eum, nemo debitis eos architecto ipsum
        inventore, temporibus est tenetur sunt laboriosam placeat enim
        recusandae quos cumque exercitationem nostrum beatae officia sapiente
        qui? Temporibus sequi perferendis ipsa voluptate molestias doloribus!
        Excepturi quo quae voluptates autem, facere dicta minima vel deserunt in
        exercitationem dolorum recusandae explicabo mollitia ab odit fugiat
        eaque ut laboriosam alias. Nulla minima nobis non tenetur sapiente
        placeat perferendis quas vero necessitatibus eaque porro dicta facilis
        nihil voluptatem, minus laudantium ut molestias perspiciatis voluptate
        accusamus id? Doloribus, id adipisci! Dolor necessitatibus, animi minima
        doloribus voluptatibus fugit, repudiandae aperiam officiis dolorum
        autem, iste illum vero eligendi laborum dicta non laboriosam cupiditate
        consequuntur velit. Tempora, placeat officiis. Explicabo eius porro
        nemo, possimus dolore commodi velit repellat incidunt impedit sunt
        debitis nisi aut quos ea! Odit alias quo reiciendis iste obcaecati ut
        soluta est aut dolorum qui velit non iusto recusandae sed officia labore
        laborum nihil, quia accusantium magnam? Mollitia quidem maiores quis
        totam expedita fugit molestiae qui, quia ipsam nobis perferendis odio
        possimus dolor officia iure sit rem laboriosam quos consequatur
        dignissimos. Ab iusto, labore sapiente qui quam consequuntur repellat
        quod saepe harum maiores doloribus pariatur suscipit optio rerum
        consequatur. Accusantium assumenda neque enim, voluptatem itaque
        repellat ea aut ex cum omnis perspiciatis minima ducimus nulla esse?
      </div>
    </div>
  );
};

export default PreviewSection;
