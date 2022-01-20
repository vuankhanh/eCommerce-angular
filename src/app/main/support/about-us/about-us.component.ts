import { Component, OnInit } from '@angular/core';

import { toHTML } from "ngx-editor";
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  data = `{"type":"doc","content":[{"type":"heading","attrs":{"level":3,"align":"left"},"content":[{"type":"text","text":"Thủy Hải Sản Carota - carota.vn"},{"type":"hard_break"},{"type":"text","text":"Số điện thoại liên hệ: 0834517989."},{"type":"hard_break"},{"type":"text","text":"Chúng tôi cung cấp một "},{"type":"text","marks":[{"type":"strong"}],"text":"“phương thức tiếp cận với thủy hải sản dễ dàng và nhanh chóng hơn cho người đang làm việc và sinh sống tại Thành Phố”"},{"type":"text","text":"."}]},{"type":"paragraph","attrs":{"align":"center"},"content":[{"type":"image","attrs":{"src":"https://api.carota.vn/gallery//product/dia-phuong/1633335447526-dia-phuong-out-side.jpg","alt":null,"title":null,"width":"317px"}}]},{"type":"heading","attrs":{"level":3,"align":null},"content":[{"type":"text","text":"Những mặt hàng "},{"type":"text","marks":[{"type":"link","attrs":{"href":"https://www.carota.vn/san-pham/hai-san","title":"https://www.carota.vn/san-pham/hai-san","target":"_blank"}}],"text":"hải sản"},{"type":"text","text":" được nhập từ các vùng biển có trữ lượng lớn như: Vũng Tàu, Khánh Hòa, Bình Định với các xưởng sản xuất có uy tín lâu năm trên thị trường trong nước. Điều đó đảm bảo những sản phẩm đến tay bạn sẽ là thực phẩm sạch và an toàn."},{"type":"hard_break"},{"type":"text","text":"Bên cạnh hải sản chúng tôi vẫn cung cấp về "},{"type":"text","marks":[{"type":"link","attrs":{"href":"https://www.carota.vn/san-pham/ca-nuoc-ngot","title":"https://www.carota.vn/san-pham/ca-nuoc-ngot","target":"_blank"}}],"text":"thủy sản"},{"type":"text","text":" với sản phẩm chính được chế biến từ "},{"type":"text","marks":[{"type":"link","attrs":{"href":"https://www.carota.vn/san-pham/ca-nuoc-ngot/60def01b97ef043a189cfb07","title":"https://www.carota.vn/san-pham/ca-nuoc-ngot/60def01b97ef043a189cfb07","target":"_blank"}}],"text":"cá rô đồng"},{"type":"text","text":". Với "},{"type":"text","marks":[{"type":"link","attrs":{"href":"https://www.carota.vn/san-pham/ca-nuoc-ngot/60def01b97ef043a189cfb07","title":"https://www.carota.vn/san-pham/ca-nuoc-ngot/60def01b97ef043a189cfb07","target":"_blank"}}],"text":"“cá rô đồng“"},{"type":"text","text":" chúng tôi đã có rất nhiều năm kinh nghiệm sản xuất và chế biến bên cạnh thương hiệu "},{"type":"text","marks":[{"type":"link","attrs":{"href":"https://www.facebook.com/ccrtuthan","title":"https://www.facebook.com/ccrtuthan","target":"_blank"}}],"text":"“Tứ Thân“"},{"type":"text","text":"."}]},{"type":"paragraph","attrs":{"align":"center"},"content":[{"type":"image","attrs":{"src":"https://api.carota.vn/gallery//product/dia-phuong/1633337287700-dia-phuong-Inside.jpg","alt":null,"title":null,"width":"317px"}}]},{"type":"heading","attrs":{"level":3,"align":null},"content":[{"type":"text","marks":[{"type":"strong"}],"text":"Tại sao là đông lạnh?"},{"type":"hard_break"},{"type":"text","text":"Để mua hải sản ở Hà Nội không khó, chỉ cần ghé vào một khu chợ cóc nhỏ bạn cũng có thể mua được tôm, cua, mực… theo nhu cầu của mình. Nhưng bạn có biết rằng hầu hết các loại hải sản chuyển về Hà Nội đều đã được tẩm ướp chất bảo quản? Dù giá hải sản tươi sống cao nhưng nếu bạn muốn ăn hải sản thường xuyên mà mua phải những loại hải sản không đảm bảo chất lượng thì có đáng không? Trong khi đó, hải sản đông lạnh được cấp đông ngay từ trên thuyền nên chắc chắn một điều là được bảo quản an toàn không có urê. Hải sản đông lạnh khi đến tay người tiêu dùng không phải là hàng sống mà còn tươi ngon và an toàn hơn các loại hải sản tươi sống bày bán trên thị trường."},{"type":"hard_break"},{"type":"text","text":"Đối với những bà nội trợ bận rộn vừa phải đi làm vừa phải chăm sóc gia đình để nấu được một bữa ăn ngon, bổ dưỡng mà tiết kiệm thời gian nhất là điều không hề đơn giản. Không phải lúc nào bạn cũng có thể đi chợ để mua thức ăn. Trong khi đó, với hải sản đông lạnh có sẵn trong tủ đông, nó có thể sẵn sàng chỉ sau 15 phút rã đông thông thường. Nếu bạn bảo quản hải sản trong ngăn đá có thể để được nhiều năm, còn trong ngăn đá sẽ giữ được 1 tháng."}]},{"type":"heading","attrs":{"level":3,"align":"center"},"content":[{"type":"image","attrs":{"src":"https://api.carota.vn/gallery//product/dia-phuong/1633335447524-dia-phuong-Offical.jpg","alt":null,"title":null,"width":"317px"}}]},{"type":"heading","attrs":{"level":3,"align":"left"},"content":[{"type":"text","text":"Hãy liên hệ ngay với chúng tôi, chúng tôi đang ở gần chỗ bạn. HH4A Linh Đàm"}]}]}`;
  preview =  toHTML(JSON.parse(this.data));
  constructor() { }

  ngOnInit(): void {
  }

}
